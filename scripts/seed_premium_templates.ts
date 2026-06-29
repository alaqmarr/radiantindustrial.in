import { prisma } from '../src/lib/prisma';

const fontStack = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const templates = [
  {
    name: "Request for Quotation (Supplier)",
    type: "EMAIL",
    subject: "Request for Quotation - Radiant Industrial Co.",
    body: `<h2 class="content-heading" style="color: #1a202c; margin-top: 0; font-size: 22px; font-weight: 700;">Request for Quotation</h2>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Dear <strong>{{name}}</strong>,</p>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">We hope this email finds you well. As part of our upcoming procurement cycle, we are requesting your best pricing and lead time for the materials listed below.</p>
<div class="callout-box" style="background-color: #faf8f5; border-left: 4px solid #ea580c; padding: 16px 20px; margin: 25px 0; border-radius: 0 6px 6px 0;">
  <p style="margin: 0; color: #4a4238; font-style: italic; font-size: 14px;">Please review the attached or pasted requirements below:</p>
</div>
<div style="margin: 30px 0; overflow-x: auto;">
  {{materials_table}}
</div>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;"><strong>Kindly ensure your quotation includes:</strong></p>
<ul style="color: #4a4238; padding-left: 20px; margin-bottom: 25px; font-size: 15px; line-height: 1.7;">
  <li style="margin-bottom: 8px;">Unit prices and total costs</li>
  <li style="margin-bottom: 8px;">Applicable taxes (GST {{gstNumber}}) and freight charges</li>
  <li style="margin-bottom: 8px;">Estimated lead time for delivery</li>
  <li style="margin-bottom: 8px;">Validity period of the quotation</li>
</ul>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Please share the quotation at your earliest convenience. If you have any questions, feel free to contact our procurement team.</p>
<div class="signature-block" style="border-top: 1px solid #e8e2d9; padding-top: 20px; margin-top: 30px;">
  <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.6;">Best Regards,<br>
  <strong style="color: #1a202c;">Procurement Division</strong><br>
  <span style="color: #718096;">Radiant Industrial Co.</span></p>
</div>`
  },
  {
    name: "Quotation Submission (Customer)",
    type: "EMAIL",
    subject: "Quotation for Industrial Materials - Radiant Industrial Co.",
    body: `<h2 class="content-heading" style="color: #1a202c; margin-top: 0; font-size: 22px; font-weight: 700;">Quotation Submission</h2>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Dear <strong>{{name}}</strong>,</p>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Thank you for considering Radiant Industrial Co. for your material requirements. We are pleased to submit our most competitive quotation for the requested items.</p>
<div style="background-color: #faf9f7; border: 1px solid #e8e2d9; padding: 20px; margin: 25px 0; border-radius: 8px;">
  <table class="responsive-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: ${fontStack};">
    <tr>
      <td style="color: #718096; font-weight: 600; width: 40%; font-size: 14px; padding-bottom: 8px;">Quotation Ref:</td>
      <td style="color: #1a202c; padding-bottom: 8px; font-size: 14px;"><strong>{{quote_reference}}</strong></td>
    </tr>
    <tr>
      <td style="color: #718096; font-weight: 600; width: 40%; font-size: 14px;">Valid Until:</td>
      <td style="color: #1a202c; font-size: 14px;"><strong>{{validity_date}}</strong></td>
    </tr>
  </table>
</div>
<div style="margin: 30px 0; overflow-x: auto;">
  {{materials_table}}
</div>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;"><strong>Key Terms & Conditions:</strong></p>
<ul style="color: #4a4238; padding-left: 20px; margin-bottom: 25px; font-size: 15px; line-height: 1.7;">
  <li style="margin-bottom: 8px;">All prices are exclusive of GST unless stated otherwise.</li>
  <li style="margin-bottom: 8px;">Delivery within <strong>{{delivery_time}}</strong> from the date of PO confirmation.</li>
  <li style="margin-bottom: 8px;">Payment terms: <strong>{{payment_terms}}</strong>.</li>
</ul>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">We look forward to a successful collaboration with <strong>{{company}}</strong>. Please let us know if you require any revisions or further clarification.</p>
<div class="signature-block" style="border-top: 1px solid #e8e2d9; padding-top: 20px; margin-top: 30px;">
  <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.6;">Best Regards,<br>
  <strong style="color: #1a202c;">Sales Team</strong><br>
  <span style="color: #718096;">Radiant Industrial Co.</span></p>
</div>`
  },
  {
    name: "Invoice & Payment Request",
    type: "EMAIL",
    subject: "Invoice {{invoice_number}} from Radiant Industrial Co.",
    body: `<h2 class="content-heading" style="color: #1a202c; margin-top: 0; font-size: 22px; font-weight: 700;">Invoice & Payment Details</h2>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Dear <strong>{{name}}</strong>,</p>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">We hope this email finds you well. Please find the details for your recent order with Radiant Industrial Co. below.</p>
<div class="callout-box" style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
  <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 16px; font-weight: 700;">Invoice Summary</h3>
  <table class="responsive-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: ${fontStack};">
    <tr>
      <td style="color: #15803d; padding-bottom: 8px; font-size: 14px; font-weight: 600;">Invoice Number:</td>
      <td style="color: #14532d; font-weight: bold; text-align: right; padding-bottom: 8px; font-size: 14px;">{{invoice_number}}</td>
    </tr>
    <tr>
      <td style="color: #15803d; padding-bottom: 12px; font-size: 14px; font-weight: 600;">Due Date:</td>
      <td style="color: #dc2626; font-weight: bold; text-align: right; padding-bottom: 12px; font-size: 14px;">{{due_date}}</td>
    </tr>
    <tr>
      <td style="color: #166534; font-weight: bold; padding-top: 12px; border-top: 1px solid #bbf7d0; font-size: 15px;">Total Amount Due:</td>
      <td style="color: #14532d; font-weight: bold; text-align: right; font-size: 18px; padding-top: 12px; border-top: 1px solid #bbf7d0;">₹{{total_amount}}</td>
    </tr>
  </table>
</div>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Please ensure payment is processed by the due date to avoid any interruptions in service. You can remit the payment to our standard bank account associated with this invoice.</p>
<p style="color: #718096; font-size: 14px; line-height: 1.7; font-style: italic;">If you have already processed this payment, please disregard this email.</p>
<div class="signature-block" style="border-top: 1px solid #e8e2d9; padding-top: 20px; margin-top: 30px;">
  <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.6;">Best Regards,<br>
  <strong style="color: #1a202c;">Accounts & Finance</strong><br>
  <span style="color: #718096;">Radiant Industrial Co.</span></p>
</div>`
  },
  {
    name: "Festival Greetings (Diwali/Eid/New Year)",
    type: "EMAIL",
    subject: "Wishing you a Happy {{occasion}} from Radiant Industrial!",
    body: `<div style="text-align: center; margin-bottom: 30px;">
  <div style="font-size: 48px; line-height: 1; margin-bottom: 15px;">✨</div>
  <h2 class="content-heading" style="color: #ea580c; margin-top: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">Happy {{occasion}}!</h2>
</div>
<p style="font-size: 16px; text-align: center; color: #1a202c; font-weight: 600;">Dear <strong>{{name}}</strong>,</p>
<p style="text-align: center; font-size: 15px; color: #4a4238; line-height: 1.8; margin: 25px 0;">
  On this joyous occasion of <strong>{{occasion}}</strong>, the entire team at Radiant Industrial Co. extends our warmest greetings to you and your loved ones.
</p>
<div style="background-color: #faf8f5; padding: 25px; border-radius: 12px; border: 1px solid #e8e2d9; text-align: center; margin: 30px 0;">
  <p style="margin: 0; font-style: italic; color: #ea580c; font-size: 17px; font-weight: 600; line-height: 1.6;">
    "May this festive season bring immense prosperity, health, and success to your business and family."
  </p>
</div>
<p style="text-align: center; color: #4a4238; font-size: 15px; line-height: 1.7;">
  We deeply value our partnership with <strong>{{company}}</strong> and look forward to achieving new milestones together in the coming days.
</p>
<div style="text-align: center; margin-top: 40px;">
  <p style="margin: 0; color: #1a202c; font-weight: 700; font-size: 16px; line-height: 1.6;">Warm Wishes,</p>
  <p style="margin: 4px 0 0 0; color: #ea580c; font-weight: 600; font-size: 15px;">The Leadership Team</p>
  <p style="margin: 2px 0 0 0; color: #718096; font-size: 14px;">Radiant Industrial Co.</p>
</div>`
  },
  {
    name: "Office Closure / Holiday Notice",
    type: "EMAIL",
    subject: "Important Notice: Office Closure for {{occasion}}",
    body: `<div style="border-bottom: 1px solid #e8e2d9; padding-bottom: 20px; margin-bottom: 25px;">
  <h2 class="content-heading" style="color: #1a202c; margin: 0; font-size: 22px; font-weight: 700;">Office Closure Notice</h2>
  <p style="color: #ea580c; margin: 6px 0 0 0; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">For the occasion of {{occasion}}</p>
</div>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Dear <strong>{{name}}</strong>,</p>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Please be informed that the offices and manufacturing units of Radiant Industrial Co. will remain closed in observance of <strong>{{occasion}}</strong>.</p>
<table class="responsive-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0; border: 1px solid #e8e2d9; border-radius: 8px; overflow: hidden; font-family: ${fontStack};">
  <tr>
    <td width="35%" style="background-color: #faf9f7; padding: 16px; border-right: 1px solid #e8e2d9; border-bottom: 1px solid #e8e2d9; font-weight: 600; color: #718096; font-size: 14px;">Closure Starts</td>
    <td width="65%" style="padding: 16px; border-bottom: 1px solid #e8e2d9; color: #1a202c; font-weight: 700; font-size: 14px;">{{closure_start_date}}</td>
  </tr>
  <tr>
    <td width="35%" style="background-color: #faf9f7; padding: 16px; border-right: 1px solid #e8e2d9; font-weight: 600; color: #718096; font-size: 14px;">Operations Resume</td>
    <td width="65%" style="padding: 16px; color: #1a202c; font-weight: 700; font-size: 14px;">{{resume_date}}</td>
  </tr>
</table>
<h3 style="color: #1a202c; font-size: 18px; margin-top: 30px; margin-bottom: 15px; font-weight: 600;">Impact on Operations:</h3>
<ul style="color: #4a4238; padding-left: 20px; line-height: 1.7; font-size: 15px; margin-bottom: 30px;">
  <li style="margin-bottom: 8px;">All scheduled dispatches during this period will be paused.</li>
  <li style="margin-bottom: 8px;">Customer support operations will be temporarily suspended.</li>
  <li style="margin-bottom: 8px;">Invoices generated will be processed on the next working day.</li>
</ul>
<div class="callout-box" style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 16px 20px; margin: 30px 0; border-radius: 0 6px 6px 0;">
  <p style="margin: 0; color: #9f1239; font-size: 14px; line-height: 1.6;"><strong>For critical emergencies</strong>, please contact our escalation team at <strong>{{emergency_contact}}</strong>.</p>
</div>
<p style="color: #2d3748; font-size: 15px; line-height: 1.7;">We appreciate your cooperation and wish you a fantastic week ahead!</p>
<div class="signature-block" style="border-top: 1px solid #e8e2d9; padding-top: 20px; margin-top: 30px;">
  <p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.6;">Best Regards,<br>
  <strong style="color: #1a202c;">Operations Team</strong><br>
  <span style="color: #718096;">Radiant Industrial Co.</span></p>
</div>`
  }
];

async function main() {
  console.log("Seeding premium HTML templates...");
  
  for (const template of templates) {
    const existing = await prisma.template.findFirst({
      where: { name: template.name }
    });
    
    if (existing) {
      console.log("Updating existing template: " + template.name);
      await prisma.template.update({
        where: { id: existing.id },
        data: {
          subject: template.subject,
          body: template.body,
          type: template.type
        }
      });
    } else {
      console.log("Creating new template: " + template.name);
      await prisma.template.create({
        data: template
      });
    }
  }
  
  console.log("Premium templates seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
