import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const nodemailer = (await import("nodemailer")).default;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const body = await request.json();
    const { email, message } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"BTQ Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'btqcleaningservices@gmail.com',
      subject: "New Contact Form Submission",
      text: `
        Email: ${email}
        Message: ${message || "No message provided"}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      {
        message: "Failed to send email",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
