import nodemailer from "nodemailer";
import { EmailModel } from "../models/Email";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || "Instant Trust Funds <noreply@instanttrustfunds.com>";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
});

export async function sendEmail({
  to,
  subject,
  html,
  type = "APPLICATION_UPDATE",
}: {
  to: string;
  subject: string;
  html: string;
  type?: "OTP" | "VERIFICATION" | "PASSWORD_RESET" | "APPLICATION_UPDATE" | "RECEIPT";
}) {
  try {
    const isProdConfigured = Boolean(SMTP_USER && SMTP_PASS);

    if (isProdConfigured) {
      await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        html,
      });
    }

    await EmailModel.create({
      recipient: to,
      subject,
      body: html,
      type,
      status: isProdConfigured ? "SENT" : "QUEUED",
    });

    console.log(`[EMAIL] Email ${isProdConfigured ? "sent" : "logged/queued"} for: ${to} (Subject: ${subject})`);
    return true;
  } catch (error: any) {
    console.error(`[EMAIL] Failed to send email to ${to}:`, error.message);
    await EmailModel.create({
      recipient: to,
      subject,
      body: html,
      type,
      status: "FAILED",
      errorDetails: error.message,
    });
    return false;
  }
}
