import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle CORS Preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// POST Request Handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'All fields are required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Email Config (Direct Values)
    const EMAIL_USER = 'info.okdriver@gmail.com'; // Sender
    const EMAIL_PASS = 'omjr enfu evyj hcgt';  // Gmail App Password
    const RECIPIENT_EMAIL = 'info.okdriver@gmail.com'; // Receiver

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Email Content
    const mailOptions = {
      from: `&quot;${name}&quot; <${email}>`,
      to: RECIPIENT_EMAIL,
      subject: subject,
      text: `
📩 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">📩 New Contact Form Submission</h2>
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> ${email}</p>
          <p><strong>📝 Subject:</strong> ${subject}</p>
          <div style="background:#f8f9fa; padding:10px; border-radius:5px;">
            ${message}
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send Email
    const info = await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: { messageId: info.messageId, message: 'Email sent successfully' },
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return new NextResponse(
      JSON.stringify({ success: false, error: error?.message || 'Failed to send email' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET Request (Optional Test Route)
export async function GET() {
  return new NextResponse(
    JSON.stringify({ message: 'Contact API is working!' }),
    { status: 200, headers: corsHeaders }
  );
}
