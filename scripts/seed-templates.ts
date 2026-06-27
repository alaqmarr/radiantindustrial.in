import { prisma } from '../src/lib/prisma';

const templates = [
  // ---------------------------------------------
  // EMAIL TEMPLATES
  // ---------------------------------------------
  {
    name: 'Quotation Submission',
    type: 'EMAIL',
    subject: 'Quotation {{rfq}} - Radiant Industrial Co.',
    body: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; color: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Radiant Industrial Co.</h1>
          <p style="color: #ffedd5; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">Premium Industrial Supplies & Materials</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px;">
          <h2 style="color: #ea580c; margin-top: 0; font-size: 22px;">Quotation Details</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Dear <strong>{{name}}</strong>,</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Thank you for reaching out to us. Following your inquiry on behalf of {{company}}, please find our most competitive rates and availability for your requested materials below.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold; margin: 0 0 10px 0;">Reference No: <span style="color: #0f172a;">{{rfq}}</span></p>
            
            <!-- EXCEL TABLE PLACEHOLDER -->
            <div style="padding: 20px; background-color: #ffffff; border: 1px dashed #cbd5e1; text-align: center; border-radius: 6px;">
              <p style="color: #94a3b8; font-style: italic; font-size: 14px; margin: 0;">[ Please paste your Excel quotation table here ]</p>
            </div>
            
          </div>

          <p style="color: #475569; font-size: 16px; line-height: 1.6;">All rates are exclusive of GST and freight unless stated otherwise in the table. We maintain a high standard of quality for all dispatches.</p>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">If you have any questions or require data sheets, please reply to this email directly.</p>
          
          <!-- Footer -->
          <div style="margin-top: 40px; border-top: 2px solid #f1f5f9; padding-top: 24px;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">Best Regards,</p>
            <p style="color: #0f172a; font-size: 18px; font-weight: bold; margin: 4px 0;">Sales Division</p>
            <p style="color: #ea580c; font-size: 15px; font-weight: bold; margin: 0;">Radiant Industrial Co.</p>
            <p style="color: #94a3b8; font-size: 13px; margin: 4px 0;">Providing Excellence in Industrial Supplies</p>
          </div>
        </div>
        
        <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; 2026 Radiant Industrial Co. All Rights Reserved.</p>
        </div>
      </div>
    `
  },
  {
    name: 'Festive Greeting',
    type: 'EMAIL',
    subject: 'Happy {{occasion}} from Radiant Industrial Co.!',
    body: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); text-align: center;">
        
        <!-- Hero Section -->
        <div style="background: linear-gradient(to right, #0f172a, #1e293b); padding: 60px 30px; position: relative;">
          <!-- Decorative circle -->
          <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0) 70%);"></div>
          
          <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 800; letter-spacing: 1px;">Happy {{occasion}}!</h1>
          <div style="width: 60px; height: 4px; background-color: #f97316; margin: 20px auto; border-radius: 2px;"></div>
          <p style="color: #cbd5e1; margin: 0; font-size: 18px; font-weight: 300;">From our family to yours.</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 50px 40px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 24px; font-weight: 600;">Dear {{name}},</h2>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.8; margin: 24px 0;">As the season of joy is upon us, the entire team at <strong>Radiant Industrial Co.</strong> would like to pause and extend our warmest greetings to you and your exceptional team at <strong>{{company}}</strong>.</p>
          
          <p style="color: #475569; font-size: 16px; line-height: 1.8; margin: 24px 0;">Thank you for your continued trust, partnership, and shared success. We look forward to achieving new milestones together in the coming year, providing you with the same uncompromised quality and service you expect from us.</p>
          
          <div style="margin-top: 50px;">
            <p style="color: #ea580c; font-size: 20px; font-weight: bold; margin: 0; font-style: italic;">Stay Radiant,</p>
            <p style="color: #64748b; font-size: 15px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">The Team at Radiant Industrial Co.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    name: 'Closure / Important Notice',
    type: 'EMAIL',
    subject: 'Important Update from Radiant Industrial Co.',
    body: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <div style="background-color: #0f172a; padding: 25px; text-align: center; border-bottom: 3px solid #f97316;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px; text-transform: uppercase;">Official Notice</h1>
        </div>
        
        <div style="padding: 40px;">
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">Dear <strong>{{name}}</strong>,</p>
          
          <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; padding: 20px; margin: 25px 0;">
            <p style="color: #9a3412; font-size: 16px; line-height: 1.6; margin: 0;"><strong>Office Closure Update:</strong><br>Please be informed that Radiant Industrial Co. will be closed from <strong>{{start_date}}</strong> to <strong>{{end_date}}</strong> due to {{reason}}.</p>
          </div>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">During this period, all dispatches, deliveries, and standard operations will be suspended. We highly recommend that you plan your material requirements accordingly and raise any urgent POs before the closure.</p>
          
          <p style="color: #334155; font-size: 16px; line-height: 1.6;">Normal operations will resume promptly on <strong>{{resume_date}}</strong>.</p>
          
          <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 24px;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">For any urgent escalation during this period, please reach out to:</p>
            <p style="color: #0f172a; font-size: 16px; font-weight: bold; margin: 4px 0;">{{emergency_contact}}</p>
          </div>
        </div>
      </div>
    `
  },
  
  // ---------------------------------------------
  // WHATSAPP TEMPLATES
  // ---------------------------------------------
  {
    name: 'Intro & Cold Marketing',
    type: 'WHATSAPP',
    body: `Hi {{name}},

I am reaching out from *Radiant Industrial Co.* 🌟 

We are a premier supplier of high-grade industrial materials, spares, and components. We partner with top manufacturers to ensure quality, reliability, and competitive pricing for all your operational needs at {{company}}.

Are you currently facing any supply chain bottlenecks or do you have any active material requirements we can quote for? 

Let us know, and we'd be happy to share our best rates!

🌐 View our catalog: https://radiantindustrial.in
📧 Email: sales@radiantindustrial.in

Best Regards,
*The Radiant Team*`
  },
  {
    name: 'Company Intro & GST Details',
    type: 'WHATSAPP',
    body: `Hello {{name}},

Thank you for connecting with *Radiant Industrial Co.*! We are a trusted supplier of premium industrial materials, dedicated to providing fast and reliable solutions for your business.

As requested, here are our official billing details for vendor registration/invoicing:

🏢 *Legal Name:* {{my_legalName}}
🧾 *GSTIN:* {{my_gstNumber}}
📍 *Registered Address:* {{my_address}}

Kindly ensure our GST number is accurately updated in your system. Feel free to message back if you require our MSME certificate or any other compliance documents.

Best Regards,
*Radiant Industrial Co.*`
  },
  {
    name: 'Company Intro & Banking Details',
    type: 'WHATSAPP',
    body: `Hello {{name}},

This is the accounts team from *Radiant Industrial Co.*, your trusted partner for industrial supplies.

Please find our official banking details below for processing payments:

🏦 *BANK DETAILS*
*Bank Name:* {{my_bankName}}
*Account Name:* {{my_legalName}}
*Account No:* {{my_accountNumber}}
*IFSC Code:* {{my_ifscCode}}
*Branch:* {{my_branch}}

Please share the UTR/payment advice once the transfer is completed so we can dispatch your materials immediately.

Thank you for your business!
*Radiant Industrial Co.*`
  }
];

async function main() {
  console.log("Seeding and overwriting premium templates...");
  let count = 0;
  for (const t of templates) {
    await prisma.template.upsert({
      where: { name: t.name },
      update: {
        subject: t.subject,
        body: t.body,
        type: t.type
      },
      create: {
        name: t.name,
        subject: t.subject,
        body: t.body,
        type: t.type
      }
    });
    console.log(`✅ Upserted template: ${t.name}`);
    count++;
  }
  console.log(`Done! Upserted ${count} premium templates.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
