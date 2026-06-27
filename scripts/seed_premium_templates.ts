import { prisma } from '../src/lib/prisma';

const templates = [
  {
    name: "Request for Quotation (Supplier)",
    type: "EMAIL",
    subject: "Request for Quotation - Radiant Industrial Co.",
    body: "<h2 style=\"color: #0f172a; margin-top: 0; font-size: 22px;\">Request for Quotation</h2>\n" +
      "<p>Dear <strong>{{name}}</strong>,</p>\n" +
      "<p>We hope this email finds you well. As part of our upcoming procurement cycle, we are requesting your best pricing and lead time for the materials listed below.</p>\n" +
      "<div style=\"background-color: #f8fafc; border-left: 4px solid #ea580c; padding: 15px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;\">\n" +
      "  <p style=\"margin: 0; color: #475569; font-style: italic;\">Please review the attached or pasted requirements below:</p>\n" +
      "</div>\n" +
      "<div style=\"margin: 30px 0;\">\n" +
      "  {{materials_table}}\n" +
      "</div>\n" +
      "<p>Kindly ensure your quotation includes:</p>\n" +
      "<ul style=\"color: #475569; padding-left: 20px; margin-bottom: 25px;\">\n" +
      "  <li style=\"margin-bottom: 8px;\">Unit prices and total costs</li>\n" +
      "  <li style=\"margin-bottom: 8px;\">Applicable taxes (GST {{gstNumber}}) and freight charges</li>\n" +
      "  <li style=\"margin-bottom: 8px;\">Estimated lead time for delivery</li>\n" +
      "  <li style=\"margin-bottom: 8px;\">Validity period of the quotation</li>\n" +
      "</ul>\n" +
      "<p>Please share the quotation at your earliest convenience. If you have any questions, feel free to contact our procurement team.</p>\n" +
      "<p style=\"margin-top: 30px;\">Best Regards,<br>\n" +
      "<strong>Procurement Division</strong><br>\n" +
      "Radiant Industrial Co.</p>"
  },
  {
    name: "Quotation Submission (Customer)",
    type: "EMAIL",
    subject: "Quotation for Industrial Materials - Radiant Industrial Co.",
    body: "<h2 style=\"color: #0f172a; margin-top: 0; font-size: 22px;\">Quotation Submission</h2>\n" +
      "<p>Dear <strong>{{name}}</strong>,</p>\n" +
      "<p>Thank you for considering Radiant Industrial Co. for your material requirements. We are pleased to submit our most competitive quotation for the requested items.</p>\n" +
      "<div style=\"background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px 20px; margin: 25px 0; border-radius: 8px;\">\n" +
      "  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n" +
      "    <tr>\n" +
      "      <td style=\"color: #475569; font-weight: bold; width: 40%;\">Quotation Ref:</td>\n" +
      "      <td style=\"color: #0f172a;\"><strong>{{quote_reference}}</strong></td>\n" +
      "    </tr>\n" +
      "    <tr>\n" +
      "      <td style=\"color: #475569; font-weight: bold; width: 40%; padding-top: 10px;\">Valid Until:</td>\n" +
      "      <td style=\"color: #0f172a; padding-top: 10px;\"><strong>{{validity_date}}</strong></td>\n" +
      "    </tr>\n" +
      "  </table>\n" +
      "</div>\n" +
      "<div style=\"margin: 30px 0;\">\n" +
      "  {{materials_table}}\n" +
      "</div>\n" +
      "<p><strong>Key Terms & Conditions:</strong></p>\n" +
      "<ul style=\"color: #475569; padding-left: 20px; margin-bottom: 25px;\">\n" +
      "  <li style=\"margin-bottom: 8px;\">All prices are exclusive of GST unless stated otherwise.</li>\n" +
      "  <li style=\"margin-bottom: 8px;\">Delivery within {{delivery_time}} from the date of PO confirmation.</li>\n" +
      "  <li style=\"margin-bottom: 8px;\">Payment terms: {{payment_terms}}.</li>\n" +
      "</ul>\n" +
      "<p>We look forward to a successful collaboration with <strong>{{company}}</strong>. Please let us know if you require any revisions or further clarification.</p>\n" +
      "<p style=\"margin-top: 30px;\">Best Regards,<br>\n" +
      "<strong>Sales Team</strong><br>\n" +
      "Radiant Industrial Co.</p>"
  },
  {
    name: "Invoice & Payment Request",
    type: "EMAIL",
    subject: "Invoice {{invoice_number}} from Radiant Industrial Co.",
    body: "<h2 style=\"color: #0f172a; margin-top: 0; font-size: 22px;\">Invoice & Payment Details</h2>\n" +
      "<p>Dear <strong>{{name}}</strong>,</p>\n" +
      "<p>We hope this email finds you well. Please find the details for your recent order with Radiant Industrial Co. below.</p>\n" +
      "<div style=\"background-color: #f8fafc; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;\">\n" +
      "  <h3 style=\"color: #0f172a; margin-top: 0; font-size: 16px;\">Invoice Summary</h3>\n" +
      "  <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"margin-top: 15px;\">\n" +
      "    <tr>\n" +
      "      <td style=\"color: #475569; padding-bottom: 8px;\">Invoice Number:</td>\n" +
      "      <td style=\"color: #0f172a; font-weight: bold; text-align: right; padding-bottom: 8px;\">{{invoice_number}}</td>\n" +
      "    </tr>\n" +
      "    <tr>\n" +
      "      <td style=\"color: #475569; padding-bottom: 8px;\">Due Date:</td>\n" +
      "      <td style=\"color: #ef4444; font-weight: bold; text-align: right; padding-bottom: 8px;\">{{due_date}}</td>\n" +
      "    </tr>\n" +
      "    <tr>\n" +
      "      <td style=\"color: #0f172a; font-weight: bold; padding-top: 8px; border-top: 1px solid #e2e8f0;\">Total Amount Due:</td>\n" +
      "      <td style=\"color: #0f172a; font-weight: bold; text-align: right; font-size: 18px; padding-top: 8px; border-top: 1px solid #e2e8f0;\">₹{{total_amount}}</td>\n" +
      "    </tr>\n" +
      "  </table>\n" +
      "</div>\n" +
      "<p>Please ensure payment is processed by the due date to avoid any interruptions in service. You can remit the payment to our standard bank account associated with this invoice.</p>\n" +
      "<p>If you have already processed this payment, please disregard this email.</p>\n" +
      "<p style=\"margin-top: 30px;\">Best Regards,<br>\n" +
      "<strong>Accounts & Finance</strong><br>\n" +
      "Radiant Industrial Co.</p>"
  },
  {
    name: "Festival Greetings (Diwali/Eid/New Year)",
    type: "EMAIL",
    subject: "Wishing you a Happy {{occasion}} from Radiant Industrial!",
    body: "<div style=\"text-align: center; margin-bottom: 30px;\">\n" +
      "  <div style=\"font-size: 50px; line-height: 1; margin-bottom: 10px;\">✨</div>\n" +
      "  <h2 style=\"color: #ea580c; margin-top: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;\">Happy {{occasion}}!</h2>\n" +
      "</div>\n" +
      "<p style=\"font-size: 18px; text-align: center; color: #334155;\">Dear <strong>{{name}}</strong>,</p>\n" +
      "<p style=\"text-align: center; font-size: 16px; color: #475569; line-height: 1.8; margin: 25px 0;\">\n" +
      "  On this joyous occasion of <strong>{{occasion}}</strong>, the entire team at Radiant Industrial Co. extends our warmest greetings to you and your loved ones.\n" +
      "</p>\n" +
      "<div style=\"background: linear-gradient(to right, rgba(234, 88, 12, 0.05), rgba(234, 88, 12, 0.1), rgba(234, 88, 12, 0.05)); padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;\">\n" +
      "  <p style=\"margin: 0; font-style: italic; color: #ea580c; font-size: 18px; font-weight: 600;\">\n" +
      "    \"May this festive season bring immense prosperity, health, and success to your business and family.\"\n" +
      "  </p>\n" +
      "</div>\n" +
      "<p style=\"text-align: center; color: #475569;\">\n" +
      "  We deeply value our partnership with <strong>{{company}}</strong> and look forward to achieving new milestones together in the coming days.\n" +
      "</p>\n" +
      "<p style=\"text-align: center; margin-top: 40px; font-weight: bold; color: #0f172a;\">\n" +
      "  Warm Wishes,<br>\n" +
      "  <span style=\"color: #ea580c;\">The Leadership Team</span><br>\n" +
      "  Radiant Industrial Co.\n" +
      "</p>"
  },
  {
    name: "Office Closure / Holiday Notice",
    type: "EMAIL",
    subject: "Important Notice: Office Closure for {{occasion}}",
    body: "<div style=\"border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 25px;\">\n" +
      "  <h2 style=\"color: #0f172a; margin: 0; font-size: 24px;\">Office Closure Notice</h2>\n" +
      "  <p style=\"color: #ea580c; margin: 5px 0 0 0; font-weight: 600;\">For the occasion of {{occasion}}</p>\n" +
      "</div>\n" +
      "<p>Dear <strong>{{name}}</strong>,</p>\n" +
      "<p>Please be informed that the offices and manufacturing units of Radiant Industrial Co. will remain closed in observance of <strong>{{occasion}}</strong>.</p>\n" +
      "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"margin: 30px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;\">\n" +
      "  <tr>\n" +
      "    <td width=\"30%\" style=\"background-color: #f8fafc; padding: 15px; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;\">Closure Starts</td>\n" +
      "    <td width=\"70%\" style=\"padding: 15px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;\">{{closure_start_date}}</td>\n" +
      "  </tr>\n" +
      "  <tr>\n" +
      "    <td width=\"30%\" style=\"background-color: #f8fafc; padding: 15px; border-right: 1px solid #e2e8f0; font-weight: bold; color: #475569;\">Operations Resume</td>\n" +
      "    <td width=\"70%\" style=\"padding: 15px; color: #0f172a; font-weight: 600;\">{{resume_date}}</td>\n" +
      "  </tr>\n" +
      "</table>\n" +
      "<h3 style=\"color: #0f172a; font-size: 18px; margin-top: 30px;\">Impact on Operations:</h3>\n" +
      "<ul style=\"color: #475569; padding-left: 20px; line-height: 1.7;\">\n" +
      "  <li>All scheduled dispatches during this period will be paused.</li>\n" +
      "  <li>Customer support operations will be temporarily suspended.</li>\n" +
      "  <li>Invoices generated will be processed on the next working day.</li>\n" +
      "</ul>\n" +
      "<div style=\"background-color: rgba(234, 88, 12, 0.1); border-left: 4px solid #ea580c; padding: 15px; margin: 30px 0; border-radius: 0 8px 8px 0;\">\n" +
      "  <p style=\"margin: 0; color: #9a3412;\"><strong>For critical emergencies</strong>, please contact our escalation team at <strong>{{emergency_contact}}</strong>.</p>\n" +
      "</div>\n" +
      "<p>We appreciate your cooperation and wish you a fantastic week ahead!</p>\n" +
      "<p style=\"margin-top: 40px;\">Best Regards,<br>\n" +
      "<strong>Operations Team</strong><br>\n" +
      "Radiant Industrial Co.</p>"
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
          body: template.body
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
