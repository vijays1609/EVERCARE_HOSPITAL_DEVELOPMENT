import nodemailer from "nodemailer";

export async function sendOtpEmail(
  email,
  code,
  env = process.env,
  ttlSeconds = 300,
) {
  const expiryMinutes = Math.ceil(ttlSeconds / 60);

  // 1. EmailJS (HTTPS REST API - sends to any Gmail address from Render)
  const serviceId = env.EMAILJS_SERVICE_ID;
  const templateId = env.EMAILJS_TEMPLATE_ID;
  const publicKey = env.EMAILJS_PUBLIC_KEY;
  const privateKey = env.EMAILJS_PRIVATE_KEY;

  if (serviceId && templateId && publicKey) {
    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            accessToken: privateKey,
            template_params: {
              email: email, // Fills the {{email}} field in your template
              passcode: code, // Injects the generated OTP into {{passcode}}
              time: `${expiryMinutes} minute(s)`, // Injects into {{time}}
            },
          }),
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`EmailJS error (${response.status}): ${errText}`);
      }

      console.log(`[EmailJS] OTP sent successfully to ${email}`);
      return true;
    } catch (err) {
      console.error("DEBUG EMAILJS DELIVERY ERROR:", err);
      throw err;
    }
  }

  // 2. Nodemailer Fallback (For local machine development)
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
        subject: "Evercare hospital verification code",
        text: `Your Evercare verification code is ${code}. It expires in ${expiryMinutes} minute(s).`,
      });

      console.log(`[SMTP] OTP sent successfully to ${email}`);
      return true;
    } catch (err) {
      console.error("DEBUG SMTP DELIVERY ERROR:", err);
      throw err;
    }
  }

  // 3. Fallback console log when no credentials are configured
  console.log(`[Evercare fallback] Verification code for ${email}: ${code}`);
  return true;
}
