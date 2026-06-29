export function wrapInEmailTemplate(title: string, body: string, email: string) {
  const fontStack = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    /* Responsive */
    @media only screen and (max-width: 640px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .email-body-cell { padding: 24px 20px !important; }
      .email-header-cell { padding: 24px 20px !important; }
      .email-footer-cell { padding: 24px 20px !important; }
      .email-header-title { font-size: 22px !important; letter-spacing: 1px !important; }
      .email-header-tagline { font-size: 11px !important; letter-spacing: 2px !important; }
      .responsive-table { width: 100% !important; }
      .responsive-table td, .responsive-table th { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .callout-box { padding: 14px 16px !important; }
      .content-heading { font-size: 20px !important; }
      .signature-block { padding-top: 16px !important; margin-top: 24px !important; }
      h2 { font-size: 20px !important; }
      h3 { font-size: 16px !important; }
      ul, ol { padding-left: 16px !important; }
    }

    @media only screen and (max-width: 480px) {
      .email-body-cell { padding: 20px 16px !important; }
      .email-header-cell { padding: 20px 16px !important; }
      .email-footer-cell { padding: 20px 16px !important; }
      .email-header-title { font-size: 18px !important; }
      .footer-links td { display: block !important; text-align: center !important; padding: 4px 0 !important; }
      .footer-links .dot-sep { display: none !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f3f0; font-family: ${fontStack}; color: #2d3748; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="background-color: #f5f3f0;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td>
        <![endif]-->
        <table class="email-container" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.06);">

          <!-- Orange Accent Stripe -->
          <tr>
            <td style="background-color: #ea580c; height: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td class="email-header-cell" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px 32px; text-align: center;">
              <h1 class="email-header-title" style="font-family: ${fontStack}; color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 2px; line-height: 1.2;">RADIANT <span style="color: #ea580c;">INDUSTRIAL</span></h1>
              <p class="email-header-tagline" style="font-family: ${fontStack}; color: #94a3b8; margin: 6px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: 500;">Excellence in Engineering</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="email-body-cell" style="padding: 36px 32px; line-height: 1.7; font-size: 15px; font-family: ${fontStack}; color: #2d3748;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="email-footer-cell" style="background-color: #faf9f7; padding: 28px 32px; text-align: center; border-top: 1px solid #e8e2d9;">
              <p style="font-family: ${fontStack}; margin: 0; color: #1a202c; font-size: 14px; font-weight: 700; letter-spacing: 0.5px;">Radiant Industrial Co.</p>
              <p style="font-family: ${fontStack}; margin: 6px 0 0 0; color: #8a8278; font-size: 12px;">Hyderabad, India</p>
              <p style="font-family: ${fontStack}; margin: 4px 0 0 0; color: #8a8278; font-size: 12px;">
                <a href="mailto:info@radiantindustrial.in" style="color: #8a8278; text-decoration: none;">info@radiantindustrial.in</a>&nbsp;&nbsp;|&nbsp;&nbsp;+91 8522095253
              </p>

              <table class="footer-links" border="0" cellspacing="0" cellpadding="0" align="center" role="presentation" style="margin-top: 16px;">
                <tr>
                  <td style="padding: 0 10px;"><a href="https://radiantindustrial.in" style="font-family: ${fontStack}; color: #ea580c; text-decoration: none; font-size: 12px; font-weight: 600;">Website</a></td>
                  <td class="dot-sep" style="color: #d4cdc4; font-size: 10px;">•</td>
                  <td style="padding: 0 10px;"><a href="mailto:info@radiantindustrial.in" style="font-family: ${fontStack}; color: #ea580c; text-decoration: none; font-size: 12px; font-weight: 600;">Contact Us</a></td>
                  <td class="dot-sep" style="color: #d4cdc4; font-size: 10px;">•</td>
                  <td style="padding: 0 10px;"><a href="https://radiantindustrial.in/about" style="font-family: ${fontStack}; color: #ea580c; text-decoration: none; font-size: 12px; font-weight: 600;">About Us</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td></tr></table>
        <![endif]-->

        <p style="font-family: ${fontStack}; text-align: center; color: #a09890; font-size: 11px; margin-top: 20px; line-height: 1.6;">
          This email was sent to ${email}.<br>
          If you no longer wish to receive these emails, <a href="mailto:info@radiantindustrial.in?subject=Unsubscribe&body=Please%20unsubscribe%20${email}" style="color: #ea580c; text-decoration: underline;">unsubscribe here</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
