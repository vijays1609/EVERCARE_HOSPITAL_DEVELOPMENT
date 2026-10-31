import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendOtpEmail(
  email,
  code,
  env = process.env,
  ttlSeconds = 300,
) {
  const expiryMinutes = Math.ceil(ttlSeconds / 60);
  const emailSubject = "Evercare hospital verification code";
  const emailText = `Your Evercare hospital verification code is ${code}. It expires in ${expiryMinutes} minute(s). Do not share it.`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0b57d0;">Evercare Hospital Verification</h2>
      <p>Your 6-digit verification code is:</p>
      <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #1a73e8; margin: 16px 0;">
        ${code}
      </div>
      <p>This code expires in <strong>${expiryMinutes} minute(s)</strong>. Do not share this code with anyone.</p>
    </div>
  `;

  // 1. Resend (HTTPS API - Bypasses Render's SMTP port firewall)
  const resendApiKey = env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromAddress =
        env.RESEND_FROM || "Evercare Hospital <onboarding@resend.dev>";

      const { data, error } = await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw error;
      }

      console.log(
        `[Resend] OTP email successfully dispatched to ${email} (ID: ${data?.id})`,
      );
      return true;
    } catch (err) {
      console.error("Failed to send email via Resend:", err);
      throw err;
    }
  }

  // 2. Fallback to Nodemailer SMTP (Local development)
  const smtpHost = env.SMTP_HOST;
  const smtpPort = env.SMTP_PORT;
  const smtpUser = env.SMTP_USER;
  const smtpPass = env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort) || 587,
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: env.SMTP_FROM || smtpUser,
        to: email,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });

      console.log(`[SMTP] OTP email successfully sent to ${email}`);
      return true;
    } catch (err) {
      console.error("Failed to send email via SMTP:", err);
      throw err;
    }
  }

  // 3. Fallback to console log (Offline testing)
  console.log(
    `[Evercare email fallback] Verification code for ${email}: ${code} (expires in ${ttlSeconds}s)`,
  );
  return true;
}
