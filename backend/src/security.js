import bcrypt from "bcrypt";
import {
  createHmac,
  randomBytes,
  randomInt,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const SCRYPT_COST = 16384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;
const SCRYPT_MAX_MEMORY = 64 * 1024 * 1024;

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function normalizePhone(phone) {
  return String(phone || "").trim().replace(/[\s()-]/g, "");
}

export function isValidE164(phone) {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

export function validatePassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 12 &&
    password.length <= 128 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export async function hashPassword(password) {
  return bcrypt.hash(String(password), 12);
}

export async function verifyPassword(password, encodedHash) {
  if (!encodedHash || typeof encodedHash !== "string") return false;
  if (encodedHash.startsWith("$2")) {
    try {
      return await bcrypt.compare(String(password), encodedHash);
    } catch {
      return false;
    }
  }

  const [algorithm, cost, blockSize, parallelization, saltValue, keyValue] =
    String(encodedHash || "").split("$");
  if (algorithm !== "scrypt" || !saltValue || !keyValue) return false;

  const expected = Buffer.from(keyValue, "base64url");
  if (expected.length !== KEY_LENGTH) return false;
  const derivedKey = await scrypt(
    password,
    Buffer.from(saltValue, "base64url"),
    expected.length,
    {
      N: Number(cost),
      r: Number(blockSize),
      p: Number(parallelization),
      maxmem: SCRYPT_MAX_MEMORY,
    },
  );
  return timingSafeEqual(Buffer.from(derivedKey), expected);
}

export async function hashAdminAccessCode(code) {
  return bcrypt.hash(String(code), 10);
}

export async function verifyAdminAccessCode(code, encodedHash) {
  if (!encodedHash || typeof encodedHash !== "string") return false;
  try {
    return await bcrypt.compare(String(code), encodedHash);
  } catch {
    return false;
  }
}

export function generateOtp() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function hashOtp(code, challengeId, secret) {
  return createHmac("sha256", secret)
    .update(`${challengeId}.${code}`)
    .digest("hex");
}

export function signSession(user, secret, now = Date.now()) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString(
    "base64url",
  );
  const payload = Buffer.from(
    JSON.stringify({
      sub: user.id,
      email: user.email || user.personal_email || user.hospital_email || "",
      hospital_email: user.hospital_email || user.email || "",
      role: user.role,
      iat: Math.floor(now / 1000),
      exp: Math.floor(now / 1000) + 60 * 60 * 12,
    }),
  ).toString("base64url");
  const content = `${header}.${payload}`;
  const signature = createHmac("sha256", secret)
    .update(content)
    .digest("base64url");
  return `${content}.${signature}`;
}

export function verifySession(token, secret, now = Date.now()) {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerPart, payloadPart, signaturePart] = parts;
  const expectedSignature = createHmac("sha256", secret)
    .update(`${headerPart}.${payloadPart}`)
    .digest();
  let suppliedSignature;
  try {
    suppliedSignature = Buffer.from(signaturePart, "base64url");
  } catch {
    return null;
  }
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const header = JSON.parse(Buffer.from(headerPart, "base64url").toString());
    const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString());
    if (header.alg !== "HS256" || !payload.sub || payload.exp <= now / 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
