import nodemailer from "nodemailer";

export async function sendOtpEmail(email, code, env = process.env, ttlSeconds = 300) {
  const smtpHost = env.SMTP_HOST;
  const smtpPort = env.SMTP_PORT;
  const smtpUser = env.SMTP_USER;
  const smtpPass = env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
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
      subject: "Evercare hospital verification code",
      text: `Your Evercare hospital verification code is ${code}. It expires in ${Math.ceil(ttlSeconds / 60)} minute(s). Do not share it.`,
    });
    return true;
  }

  console.log(`[Evercare email fallback] Verification code for ${email}: ${code} (expires in ${ttlSeconds}s)`);
  return true;
}
