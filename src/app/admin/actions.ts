"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveContact(data: { id?: string; name: string; email: string; phone?: string; company?: string; gstNumber?: string; tags: string[] }) {
  try {
    let contact;
    if (data.id) {
      contact = await prisma.contact.update({
        where: { id: data.id },
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          gstNumber: data.gstNumber,
        }
      });
      // Clear old tags
      await prisma.contactTag.deleteMany({ where: { contactId: contact.id } });
    } else {
      contact = await prisma.contact.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          gstNumber: data.gstNumber,
        }
      });
    }

    if (data.tags && data.tags.length > 0) {
      for (const tagName of data.tags) {
        let tag = await prisma.tag.findUnique({ where: { name: tagName } });
        if (!tag) {
          tag = await prisma.tag.create({ data: { name: tagName } });
        }
        await prisma.contactTag.create({
          data: {
            contactId: contact.id,
            tagId: tag.id,
          }
        });
      }
    }

    revalidatePath("/admin/lists");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving contact:", error);
    return { error: "Failed to save contact. Email might already exist." };
  }
}

export async function deleteTag(id: string) {
  try {
    await prisma.tag.delete({ where: { id } });
    revalidatePath("/admin/lists");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete list" };
  }
}

export async function saveTag(data: { id?: string; name: string }) {
  try {
    if (data.id) {
      await prisma.tag.update({
        where: { id: data.id },
        data: { name: data.name }
      });
    } else {
      await prisma.tag.create({
        data: { name: data.name }
      });
    }
    revalidatePath("/admin/lists");
    return { success: true };
  } catch (error) {
    return { error: "Failed to save list" };
  }
}

export async function deleteContact(id: string) {
  try {
    await prisma.contact.delete({ where: { id } });
    revalidatePath("/admin/lists");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete contact" };
  }
}

export async function saveTemplate(data: { id?: string; name: string; subject?: string; body: string; type: string }) {
  try {
    if (data.id) {
      await prisma.template.update({
        where: { id: data.id },
        data: {
          name: data.name,
          subject: data.subject,
          body: data.body,
          type: data.type
        }
      });
    } else {
      await prisma.template.create({
        data: {
          name: data.name,
          subject: data.subject,
          body: data.body,
          type: data.type
        }
      });
    }
    revalidatePath("/admin/templates");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving template:", error);
    return { error: "Failed to save template. Name might already be in use." };
  }
}

export async function deleteTemplate(id: string) {
  try {
    await prisma.template.delete({ where: { id } });
    revalidatePath("/admin/templates");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete template" };
  }
}

export async function sendCampaignEmails(
  templateId: string, 
  tagId: string | null, 
  dynamicVars: Record<string, string>, 
  contactId: string | null = null,
  manualContact: { name: string; email: string; phone?: string; company?: string; gstNumber?: string; saveContact?: boolean } | null = null
) {
  try {
    const template = await prisma.template.findUnique({ where: { id: templateId } });
    if (!template || template.type !== 'EMAIL') return { error: "Invalid template" };

    // Fetch settings for global placeholders
    const settings = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => settingsMap[s.key] = s.value);

    let contacts = [];
    
    if (manualContact) {
      if (manualContact.saveContact) {
        // Save to DB
        const newContact = await prisma.contact.upsert({
          where: { email: manualContact.email },
          update: {
            name: manualContact.name,
            phone: manualContact.phone,
            company: manualContact.company,
            gstNumber: manualContact.gstNumber,
          },
          create: {
            name: manualContact.name,
            email: manualContact.email,
            phone: manualContact.phone,
            company: manualContact.company,
            gstNumber: manualContact.gstNumber,
          }
        });
        contacts = [newContact];
      } else {
        // Just use it without saving (needs ID for type compliance though not used)
        contacts = [{ ...manualContact, id: "temp", createdAt: new Date(), updatedAt: new Date() }];
      }
    } else {
      contacts = await prisma.contact.findMany({
        where: contactId 
          ? { id: contactId }
          : tagId 
            ? { tags: { some: { tagId } } } 
            : undefined
      });
    }

    if (contacts.length === 0) return { error: "No contacts found for this selection." };

    const nodemailer = require("nodemailer");
    
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return { error: "SMTP credentials not configured in environment variables." };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let successCount = 0;
    let failCount = 0;

    for (const contact of contacts) {
      if (!contact.email) continue;

      let html = template.body;
      let subject = template.subject || "";

      // Replace placeholders
      const replaceHolders = (str: string) => {
        let res = str
          .replace(/\{\{name\}\}/g, contact.name || "Customer")
          .replace(/\{\{company\}\}/g, contact.company || "your company")
          .replace(/\{\{gstNumber\}\}/g, contact.gstNumber || "")
          .replace(/\{\{phone\}\}/g, contact.phone || "")
          .replace(/\{\{email\}\}/g, contact.email || "");
          
        // Global Settings Placeholders
        for (const [key, value] of Object.entries(settingsMap)) {
          const regex = new RegExp(`\\{\\{my_${key}\\}\\}`, 'g');
          res = res.replace(regex, value);
        }
        
        // Dynamic Campaign Variables Placeholders
        for (const [key, value] of Object.entries(dynamicVars)) {
          const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
          res = res.replace(regex, value);
        }
        
        // Make pasted HTML tables look professional and match the email styling
        res = res.replace(/<table/gi, '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; font-size: 14px; text-align: left; background-color: #ffffff; border: 1px solid #e8e2d9;"');
        res = res.replace(/<thead/gi, '<thead style="border-bottom: 2px solid #e8e2d9;"');
        res = res.replace(/<th/gi, '<th style="background-color: #1e293b; color: #ffffff; font-weight: 600; padding: 12px 16px; border: 1px solid #e8e2d9; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;"');
        res = res.replace(/<td/gi, '<td style="padding: 12px 16px; border: 1px solid #e8e2d9; color: #2d3748;"');

        return res;
      };

      html = replaceHolders(html);
      subject = replaceHolders(subject);
      
      // Wrap in standard Radiant Industrial template
      const { wrapInEmailTemplate } = require('@/lib/emailTemplate');
      html = wrapInEmailTemplate(subject, html, contact.email);

      try {
        await transporter.sendMail({
          from: `"Radiant Industrial Co." <${process.env.SMTP_USER}>`,
          to: contact.email,
          subject,
          html,
        });
        successCount++;
      } catch (err) {
        console.error("Failed to send to", contact.email, err);
        failCount++;
      }
    }

    return { success: true, sent: successCount, failed: failCount };
  } catch (error: any) {
    console.error("Campaign error:", error);
    return { error: "An unexpected error occurred during the campaign." };
  }
}

