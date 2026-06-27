export function wrapInEmailTemplate(title: string, body: string, email: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
        <![endif]-->
        <table border="0" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px; text-align: center; border-bottom: 4px solid #ea580c;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px; line-height: 1.2;">RADIANT<span style="color: #ea580c;">INDUSTRIAL</span></h1>
              <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Excellence in Engineering</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px; line-height: 1.6; font-size: 16px;">
              ${body}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: bold;">Radiant Industrial Co.</p>
              <p style="margin: 5px 0 15px 0; color: #94a3b8; font-size: 12px;">Providing premium industrial solutions since 1995</p>
              
              <table border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td style="padding: 0 10px;"><a href="https://radiantindustrial.in" style="color: #ea580c; text-decoration: none; font-size: 12px; font-weight: bold;">Website</a></td>
                  <td style="padding: 0 10px;"><a href="mailto:info@radiantindustrial.in" style="color: #ea580c; text-decoration: none; font-size: 12px; font-weight: bold;">Contact Us</a></td>
                  <td style="padding: 0 10px;"><a href="https://radiantindustrial.in/privacy-policy" style="color: #ea580c; text-decoration: none; font-size: 12px; font-weight: bold;">Privacy Policy</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
            </td>
          </tr>
        </table>
        <![endif]-->
        
        <p style="text-align: center; color: #94a3b8; font-size: 11px; margin-top: 20px;">
          This email was sent to ${email}.<br>
          If you no longer wish to receive these emails, please reply to this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
