import { sendOtpEmail } from "./mail.js";

export class SmsNotConfiguredError extends Error {
  constructor() {
    super("SMS provider is not configured");
    this.name = "SmsNotConfiguredError";
  }
}

export async function sendOtpSms(to, code, env = process.env, ttlSeconds = 300) {
  if (typeof to === "string" && to.includes("@")) {
    return sendOtpEmail(to, code, env, ttlSeconds);
  }

  const { TWILIO_ACCOUNT_SID: accountSid, TWILIO_AUTH_TOKEN: authToken, TWILIO_FROM_NUMBER: from } = env;
  if (!accountSid || !authToken || !from) {
    console.log(`[Evercare fallback] Verification code for ${to}: ${code} (expires in ${ttlSeconds}s)`);
    return true;
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`;
  const body = new URLSearchParams({
    To: to,
    From: from,
    Body: `Your Evercare verification code is ${code}. It expires in ${Math.ceil(ttlSeconds / 60)} minute(s). Do not share it.`,
  });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("SMS provider rejected the message");
}
