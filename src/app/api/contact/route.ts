import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Needs to be an App Password
      },
    });

    // Verify connection configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP connection error:', verifyError);
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }

    // Email to Radiant Industrial Co.
    const mailOptionsToAdmin = {
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER, // sending to themselves or a designated receiver
      replyTo: email,
      subject: `New Lead: ${name} from Radiant Industrial Website`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
      `,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Thank you email to the user
    const mailOptionsToUser = {
      from: `"Radiant Industrial Co." <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Radiant Industrial Co.',
      text: `Hello ${name},\n\nThank you for reaching out to Radiant Industrial Co. We have received your message and our team will get back to you shortly.\n\nBest regards,\nRadiant Industrial Co. Team`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #ea580c;">Thank you for your interest!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to Radiant Industrial Co. We have received your message and our team will get back to you shortly to discuss your procurement needs.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Radiant Industrial Co. Team</strong></p>
          <p><a href="mailto:info@radiantindustrial.in">info@radiantindustrial.in</a> | +91 9618443558</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptionsToAdmin);
    await transporter.sendMail(mailOptionsToUser);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
