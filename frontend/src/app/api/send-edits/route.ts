import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { websiteData, originalData, changes } = body;

    // Get SMTP credentials from environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;

    if (!smtpUser || !smtpPass || !smtpHost || !smtpPort) {
      return NextResponse.json(
        {
          success: false,
          error: "SMTP credentials are not configured. Please check your environment variables.",
        },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Create email content
    const emailSubject = "Website Content Updates - BTQ Cleaning";
    
    let emailBody = "Hello,\n\n";
    emailBody += "The following changes have been requested for the website:\n\n";
    emailBody += "=".repeat(60) + "\n\n";

    if (changes && changes.length > 0) {
      emailBody += "CHANGES SUMMARY:\n";
      emailBody += "-".repeat(60) + "\n";
      changes.forEach((change: any, index: number) => {
        emailBody += `\n${index + 1}. ${change.section} - ${change.field}\n`;
        emailBody += `   Old: ${change.oldValue.substring(0, 150)}${change.oldValue.length > 150 ? "..." : ""}\n`;
        emailBody += `   New: ${change.newValue.substring(0, 150)}${change.newValue.length > 150 ? "..." : ""}\n`;
      });
      emailBody += "\n" + "=".repeat(60) + "\n\n";
    }

    emailBody += "UPDATED JSON:\n";
    emailBody += "-".repeat(60) + "\n\n";
    emailBody += JSON.stringify(websiteData, null, 2);

    // Send email to developer (yourself)
    const mailOptions = {
      from: smtpUser,
      to: smtpUser, // Send to yourself
      subject: emailSubject,
      text: emailBody,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully with updated website data",
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send email",
      },
      { status: 500 }
    );
  }
}

