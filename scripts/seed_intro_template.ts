import { prisma } from '../src/lib/prisma';

const emailBody = `<h2 class="content-heading" style="color: #1a202c; margin-top: 0; font-size: 22px; font-weight: 700;">Vendor Introduction</h2>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Hello,</p>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">I am writing to introduce <strong>Radiant Industrial Co.</strong> We are a comprehensive supply firm specializing in industrial, agricultural, and general operational equipment.</p>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">We understand that finding dependable vendors for diverse daily needs can be a challenge. Our goal is to simplify your procurement process by serving as a single, reliable point of contact for:</p>

<div class="callout-box" style="background-color: #faf8f5; border-left: 4px solid #ea580c; padding: 20px; margin: 25px 0; border-radius: 0 6px 6px 0;">
  <ul style="color: #4a4238; padding-left: 20px; margin: 0; font-size: 15px; line-height: 1.7;">
    <li style="margin-bottom: 12px;"><strong>Industrial & General Supplies:</strong> Ranging from hardware and safety gear to facility maintenance essentials.</li>
    <li style="margin-bottom: 12px;"><strong>Agricultural Equipment:</strong> Tools, implements, and supplies for land and crop management.</li>
    <li><strong>Special Items:</strong> Niche or hard-to-source technical components.</li>
  </ul>
</div>

<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">We pride ourselves on prompt fulfillment, quality products, and highly competitive pricing. We would welcome the opportunity to be added to your approved vendor list or to provide a quick quote the next time you need to source materials.</p>

<div class="callout-box" style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
  <p style="margin: 0; color: #14532d; font-size: 14px; font-weight: 500; font-style: italic;">Please let us know if there is a specific department or contact we should direct our product catalog to.</p>
</div>

<div class="signature-block" style="border-top: 1px solid #e8e2d9; padding-top: 20px; margin-top: 30px;">
  <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.6;">Best regards,<br>
  <strong style="color: #1a202c;">Al Aqmar Kanchwala</strong><br>
  <span style="color: #718096;">Radiant Industrial Co.</span><br>
  <span style="color: #ea580c; font-weight: 500;">+91 8522095253</span><br>
  <a href="https://radiantindustrial.in" style="color: #3b82f6; text-decoration: none;">radiantindustrial.in</a>
  </p>
</div>`;

const whatsappBody = `*Reliable supply sourcing for your facility and operations* 🏭

Hello,

I am writing to introduce *Radiant Industrial Co.* We are a comprehensive supply firm specializing in industrial, agricultural, and general operational equipment.

We understand that finding dependable vendors for diverse daily needs can be a challenge. Our goal is to simplify your procurement process by serving as a single, reliable point of contact for:

🔧 *Industrial & General Supplies:* Ranging from hardware and safety gear to facility maintenance essentials.
🚜 *Agricultural Equipment:* Tools, implements, and supplies for land and crop management.
⚙️ *Special Items:* Niche or hard-to-source technical components.

We pride ourselves on prompt fulfillment, quality products, and highly competitive pricing. We would welcome the opportunity to be added to your approved vendor list or to provide a quick quote the next time you need to source materials.

Please let us know if there is a specific department or contact we should direct our product catalog to.

Best regards,
*Al Aqmar Kanchwala*
Radiant Industrial Co.
+91 8522095253
radiantindustrial.in`;

const templates = [
  {
    name: "Company Intro & Sourcing Pitch (Email)",
    type: "EMAIL",
    subject: "Reliable supply sourcing for your facility and operations",
    body: emailBody
  },
  {
    name: "Company Intro & Sourcing Pitch (WhatsApp)",
    type: "WHATSAPP",
    subject: "",
    body: whatsappBody
  }
];

async function main() {
  console.log("Seeding Company Introduction Templates...");
  
  for (const template of templates) {
    const existing = await prisma.template.findFirst({
      where: { name: template.name, type: template.type }
    });
    
    if (existing) {
      console.log(`Updating existing ${template.type} template...`);
      await prisma.template.update({
        where: { id: existing.id },
        data: {
          subject: template.subject,
          body: template.body,
        }
      });
    } else {
      console.log(`Creating new ${template.type} template...`);
      await prisma.template.create({
        data: template
      });
    }
  }
  
  console.log("Intro templates seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
