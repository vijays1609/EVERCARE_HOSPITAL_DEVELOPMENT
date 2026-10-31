import {
  createHmac,
  randomBytes,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { createServer } from "node:http";
import {
  generateOtp,
  hashOtp,
  hashPassword,
  isValidE164,
  normalizeEmail,
  normalizePhone,
  signSession,
  validatePassword,
  verifyAdminAccessCode,
  verifyPassword,
  verifySession,
} from "./security.js";
import { sendOtpEmail } from "./mail.js";
import { sendOtpSms } from "./sms.js";
import { inTransaction } from "./database.js";

const BODY_LIMIT_BYTES = 1_048_576;
const OTP_ATTEMPT_LIMIT = 5;

class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function isSmsConfigured(env) {
  return Boolean(
    env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_FROM_NUMBER,
  );
}

function isSmtpConfigured(env) {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
}

function generateHospitalEmail(firstName, authDb) {
  const baseName =
    String(firstName || "staff")
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "") || "staff";
  let suffix = 100 + Math.floor(Math.random() * 900);
  let candidate = `${baseName}${suffix}@evercare.com`;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const existing = authDb
      .prepare("SELECT id FROM users WHERE hospital_email = ? COLLATE NOCASE")
      .get(candidate);
    if (!existing) return candidate;
    suffix = 100 + ((suffix + 1) % 900);
    candidate = `${baseName}${suffix}@evercare.com`;
  }
  throw new Error("Unable to generate a unique institutional email address.");
}

function rateLimiter(now) {
  const buckets = new Map();
  let lastCleanup = 0;
  return (key, maximum, windowMs) => {
    const timestamp = now();
    if (timestamp - lastCleanup > 60_000) {
      for (const [bucketKey, bucket] of buckets) {
        if (bucket.expiresAt <= timestamp) buckets.delete(bucketKey);
      }
      lastCleanup = timestamp;
    }
    const bucket = buckets.get(key);
    if (!bucket || bucket.expiresAt <= timestamp) {
      buckets.set(key, { count: 1, expiresAt: timestamp + windowMs });
      return true;
    }
    bucket.count += 1;
    return bucket.count <= maximum;
  };
}

async function readJson(request) {
  const contentType = request.headers["content-type"] || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new HttpError(415, "JSON_REQUIRED", "Send the request as JSON.");
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > BODY_LIMIT_BYTES) {
      throw new HttpError(413, "BODY_TOO_LARGE", "Request body is too large.");
    }
    chunks.push(chunk);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new Error();
    return body;
  } catch {
    throw new HttpError(
      400,
      "INVALID_JSON",
      "Request body must be a JSON object.",
    );
  }
}

function sendJson(response, status, value) {
  if (response.writableEnded) return;
  const body = JSON.stringify(value);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  });
  response.end(body);
}

function sessionFromRequest(request, authDb, secret) {
  const authorization = request.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  const claims = verifySession(token, secret);
  if (!claims) throw new HttpError(401, "UNAUTHORIZED", "Sign in is required.");
  const user = authDb
    .prepare(
      "SELECT id, full_name, email, phone, age, department, role FROM users WHERE id = ? AND is_active = 1",
    )
    .get(claims.sub);
  if (!user || user.role !== claims.role) {
    throw new HttpError(401, "UNAUTHORIZED", "Sign in is required.");
  }
  return user;
}

function publicUser(user) {
  return {
    id: user.id,
    name:
      user.full_name ||
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      "",
    first_name: user.first_name || (user.full_name || "").split(" ")[0] || "",
    last_name:
      user.last_name ||
      (user.full_name || "").split(" ").slice(1).join(" ") ||
      "",
    email: user.email || user.personal_email || user.hospital_email,
    personal_email: user.personal_email || user.email || user.hospital_email,
    hospital_email: user.hospital_email || user.email,
    phone: user.phone,
    age: user.age,
    department: user.department,
    role: user.role,
    created_at: user.created_at,
  };
}

function safeHashEqual(left, right) {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function medicineView(row) {
  return {
    id: row.id,
    name: row.name,
    genericName: row.generic_name,
    category: row.category,
    strength: row.strength,
    priceCents: row.price_cents,
    stockQuantity: row.stock_quantity,
    reorderLevel: row.reorder_level,
    prescriptionRequired: Boolean(row.prescription_required),
    inStock: row.stock_quantity > 0,
  };
}

function patientView(row) {
  return {
    id: row.id,
    kind: row.record_kind,
    fullName: row.full_name,
    age: row.age,
    gender: row.gender,
    phone: row.phone,
    email: row.email,
    ward: row.ward,
    doctor: row.doctor,
    diagnosis: row.diagnosis,
    admittedAt: row.admitted_at,
    dischargedAt: row.discharged_at,
    operation: row.operation_name,
    operationDate: row.operation_date,
    status: row.status,
    transactionId: row.transaction_id,
    transactionStatus: row.transaction_status,
    amountCents: row.amount_cents,
    createdAt: row.created_at,
  };
}

function pagination(url) {
  const page = Math.max(
    1,
    Number.parseInt(url.searchParams.get("page") || "1", 10) || 1,
  );
  const limit = Math.min(
    100,
    Math.max(
      1,
      Number.parseInt(url.searchParams.get("limit") || "50", 10) || 50,
    ),
  );
  return { page, limit, offset: (page - 1) * limit };
}

export function createApiServer({
  authDb,
  clinicalDb,
  env = process.env,
  smsSender = sendOtpSms,
  emailSender = sendOtpEmail,
  now = Date.now,
}) {
  const secret = env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }
  const otpTtlSeconds = Math.min(
    600,
    Math.max(60, Number(env.OTP_TTL_SECONDS) || 300),
  );
  const origins = new Set(
    (env.CORS_ORIGINS || "http://localhost:5500,http://127.0.0.1:5500")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
  const allowRequest = rateLimiter(now);
  let dummyHashPromise;
  const dummyPasswordHash = () => {
    dummyHashPromise ??= hashPassword(randomBytes(32).toString("base64url"));
    return dummyHashPromise;
  };

  // Ensure clinical database columns exist for treatment plans, prescriptions, and contact details
  try {
    clinicalDb.exec("ALTER TABLE admissions ADD COLUMN phone TEXT;");
  } catch {}
  try {
    clinicalDb.exec("ALTER TABLE admissions ADD COLUMN treatment_plan TEXT;");
  } catch {}
  try {
    clinicalDb.exec("ALTER TABLE admissions ADD COLUMN medicines TEXT;");
  } catch {}
  try {
    clinicalDb.exec("ALTER TABLE admissions ADD COLUMN injections TEXT;");
  } catch {}
  try {
    clinicalDb.exec("ALTER TABLE admissions ADD COLUMN blood_tests TEXT;");
  } catch {}
  try {
    clinicalDb.exec("ALTER TABLE admissions ADD COLUMN other_tests TEXT;");
  } catch {}
  try {
    clinicalDb.exec("ALTER TABLE patients ADD COLUMN prescription TEXT;");
  } catch {}

  async function handle(request, response) {
    const origin = request.headers.origin;
    response.setHeader("Vary", "Origin");
    if (origin && origins.has(origin)) {
      response.setHeader("Access-Control-Allow-Origin", origin);
      response.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Content-Type",
      );
      response.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
      );
    } else if (origin) {
      sendJson(response, 403, {
        error: {
          code: "ORIGIN_NOT_ALLOWED",
          message: "This origin is not allowed.",
        },
      });
      return;
    }
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      });
      response.end();
      return;
    }

    const requestUrl = new URL(request.url || "/", "http://localhost");
    const route = `${request.method} ${requestUrl.pathname}`;
    const ip = request.socket.remoteAddress || "unknown";
    try {
      if (route === "GET /health") {
        sendJson(response, 200, {
          status: "ok",
          service: "evercare-hospital-api",
        });
        return;
      }
      if (route === "GET /view-db") {
        const rows = clinicalDb
          .prepare("SELECT * FROM patients ORDER BY id DESC LIMIT 20")
          .all();

        const tableRows = rows
          .map(
            (p) => `
          <tr>
            <td>${p.id}</td>
            <td><strong>${p.full_name || ""}</strong></td>
            <td>${p.age || ""}</td>
            <td>${p.gender || ""}</td>
            <td>${p.phone || ""}</td>
            <td>${p.email || ""}</td>
            <td>${p.department || ""}</td>
            <td>${p.ward || ""}</td>
            <td>${p.doctor || ""}</td>
            <td><span class="badge">${p.status || ""}</span></td>
            <td>${p.created_at ? new Date(p.created_at).toLocaleString() : ""}</td>
          </tr>`,
          )
          .join("");

        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Evercare - Patient Records</title>
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; background: #0f172a; color: #f8fafc; }
                h2 { margin-bottom: 16px; font-weight: 600; }
                table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden; }
                th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #334155; font-size: 14px; }
                th { background: #0f172a; color: #94a3b8; font-weight: 600; text-transform: uppercase; font-size: 12px; }
                tr:hover { background: #334155; }
                .badge { background: #059669; color: white; padding: 3px 8px; border-radius: 9999px; font-size: 12px; }
              </style>
            </head>
            <body>
              <h2>Registered Patients (${rows.length})</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Ward</th>
                    <th>Doctor</th>
                    <th>Status</th>
                    <th>Registered At</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows || '<tr><td colspan="11" style="text-align:center;">No records found</td></tr>'}
                </tbody>
              </table>
            </body>
          </html>
        `;

        response.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        });
        response.end(html);
        return;
      }


      if (route === "POST /api/auth/send-otp") {
        if (!allowRequest(`email-otp-ip:${ip}`, 20, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many verification requests. Try again later.",
          );
        }
        const body = await readJson(request);
        const firstName = String(body.first_name || body.name || "").trim();
        const lastName = String(body.last_name || "").trim();
        const personalEmail = normalizeEmail(body.personal_email || body.email);
        const department =
          String(body.department || "General Medicine").trim() ||
          "General Medicine";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalEmail)) {
          throw new HttpError(
            400,
            "INVALID_EMAIL",
            "Enter a valid personal email address.",
          );
        }
        if (!firstName || firstName.length > 80) {
          throw new HttpError(
            400,
            "INVALID_NAME",
            "Provide a valid first name.",
          );
        }
        const challengeId = randomUUID();
        const code = generateOtp();
        const createdAt = new Date(now()).toISOString();
        authDb
          .prepare(
            "DELETE FROM otp_challenges WHERE personal_email = ? COLLATE NOCASE",
          )
          .run(personalEmail);
        authDb
          .prepare(
            `
          INSERT INTO otp_challenges (id, first_name, last_name, full_name, personal_email, email, department, password_hash, otp_hash, expires_at, attempts, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
        `,
          )
          .run(
            challengeId,
            firstName,
            lastName,
            `${firstName}${lastName ? ` ${lastName}` : ""}`.trim(),
            personalEmail,
            personalEmail,
            department,
            "",
            hashOtp(code, challengeId, secret),
            now() + otpTtlSeconds * 1000,
            createdAt,
          );
        try {
          await emailSender(personalEmail, code, env, otpTtlSeconds);
        } catch (err) {
          /*catch {
          authDb
            .prepare("DELETE FROM otp_challenges WHERE id = ?")
            .run(challengeId);
          throw new HttpError(
            502,
            "EMAIL_DELIVERY_FAILED",
            "Could not deliver the verification email. Try again later.",
          );
        }*/
          console.error("DEBUG EMAIL DELIVERY ERROR:", err);
          authDb
            .prepare("DELETE FROM otp_challenges WHERE id = ?")
            .run(challengeId);
          throw new HttpError(
            502,
            "EMAIL_DELIVERY_FAILED",
            "Could not deliver the verification email. Try again later.",
          );
        }
        sendJson(response, 202, {
          challengeId,
          message:
            "A six-digit verification code has been sent to your personal email.",
          expiresInSeconds: otpTtlSeconds,
        });
        return;
      }

      if (route === "POST /api/auth/verify-otp") {
        if (!allowRequest(`email-verify-ip:${ip}`, 30, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many verification attempts. Try again later.",
          );
        }
        const body = await readJson(request);
        const personalEmail = normalizeEmail(body.personal_email || body.email);
        const challengeId = String(body.challengeId || "").trim();
        const code = String(body.code || "").trim();
        if (!personalEmail || !challengeId || !/^\d{6}$/.test(code)) {
          throw new HttpError(
            400,
            "INVALID_VERIFICATION",
            "Enter the email, challenge ID, and six-digit verification code.",
          );
        }
        const challenge = authDb
          .prepare(
            "SELECT * FROM otp_challenges WHERE id = ? AND personal_email = ? COLLATE NOCASE",
          )
          .get(challengeId, personalEmail);
        if (
          !challenge ||
          challenge.expires_at <= now() ||
          challenge.attempts >= OTP_ATTEMPT_LIMIT
        ) {
          if (challenge)
            authDb
              .prepare("DELETE FROM otp_challenges WHERE id = ?")
              .run(challengeId);
          throw new HttpError(
            400,
            "INVALID_OR_EXPIRED_CODE",
            "The verification code is invalid or expired. Request a new code.",
          );
        }
        if (
          !safeHashEqual(
            challenge.otp_hash,
            hashOtp(code, challenge.id, secret),
          )
        ) {
          const attempts = challenge.attempts + 1;
          if (attempts >= OTP_ATTEMPT_LIMIT) {
            authDb
              .prepare("DELETE FROM otp_challenges WHERE id = ?")
              .run(challengeId);
          } else {
            authDb
              .prepare("UPDATE otp_challenges SET attempts = ? WHERE id = ?")
              .run(attempts, challengeId);
          }
          throw new HttpError(
            400,
            "INVALID_OR_EXPIRED_CODE",
            "The verification code is invalid or expired. Request a new code.",
          );
        }
        const transientUser = {
          id: challenge.id,
          email: personalEmail,
          personal_email: personalEmail,
          role: "otp_verification",
        };
        sendJson(response, 200, {
          verified: true,
          verificationToken: signSession(transientUser, secret, now()),
          challengeId,
        });
        return;
      }

      if (route === "POST /api/auth/register") {
        const body = await readJson(request);
        const verificationToken = String(body.verificationToken || "");
        const claims = verifySession(verificationToken, secret, now());
        if (!claims || claims.role !== "otp_verification") {
          throw new HttpError(
            401,
            "VERIFICATION_REQUIRED",
            "Complete email verification before creating an account.",
          );
        }
        const firstName = String(body.first_name || body.name || "").trim();
        const lastName = String(body.last_name || "").trim();
        const personalEmail = normalizeEmail(body.personal_email || body.email);
        const password = typeof body.password === "string" ? body.password : "";
        const department =
          String(body.department || "General Medicine").trim() ||
          "General Medicine";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalEmail)) {
          throw new HttpError(
            400,
            "INVALID_EMAIL",
            "Enter a valid personal email address.",
          );
        }
        if (!firstName || firstName.length > 80) {
          throw new HttpError(
            400,
            "INVALID_NAME",
            "Provide a valid first name.",
          );
        }
        if (!validatePassword(password)) {
          throw new HttpError(
            400,
            "WEAK_PASSWORD",
            "Password must be 12-128 characters and include uppercase, lowercase, number, and symbol characters.",
          );
        }

        const userId = randomUUID();
        const hospitalEmail = generateHospitalEmail(firstName, authDb);
        const existing = authDb
          .prepare(
            "SELECT id FROM users WHERE personal_email = ? COLLATE NOCASE OR hospital_email = ? COLLATE NOCASE OR email = ? COLLATE NOCASE LIMIT 1",
          )
          .get(personalEmail, hospitalEmail, personalEmail);
        if (existing) {
          throw new HttpError(
            409,
            "ACCOUNT_EXISTS",
            "An account already exists for this employee identity.",
          );
        }

        const passwordHash = await hashPassword(password);
        const fullName = `${firstName}${lastName ? ` ${lastName}` : ""}`.trim();
        const createdAt = new Date(now()).toISOString();
        const user = {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          personal_email: personalEmail,
          hospital_email: hospitalEmail,
          email: personalEmail,
          phone: null,
          age: null,
          department,
          role: "staff",
          password_hash: passwordHash,
          created_at: createdAt,
        };

        authDb
          .prepare(
            `
          INSERT INTO users (id, first_name, last_name, full_name, email, personal_email, hospital_email, phone, age, department, password_hash, role, is_active, is_seeded, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'staff', 1, 0, ?)
        `,
          )
          .run(
            user.id,
            user.first_name,
            user.last_name,
            user.full_name,
            user.email,
            user.personal_email,
            user.hospital_email,
            user.phone,
            user.age,
            user.department,
            user.password_hash,
            createdAt,
          );

        authDb
          .prepare(
            "DELETE FROM otp_challenges WHERE personal_email = ? COLLATE NOCASE",
          )
          .run(personalEmail);
        sendJson(response, 201, {
          token: signSession(user, secret, now()),
          user: publicUser(user),
          message: `Registration successful! Your official hospital login handle is: ${user.hospital_email}`,
        });
        return;
      }

      // --- Clinical Endpoints (Patients & Admissions) ---

      if (request.method === "GET" && requestUrl.pathname === "/api/patients") {
        const location = requestUrl.searchParams.get("location");
        let query = "SELECT * FROM patients";
        const params = [];
        if (location) {
          query += " WHERE (ward = ? OR department = ?)";
          params.push(location, location);
        }
        query += " ORDER BY created_at DESC, id DESC";

        const rows =
          params.length > 0
            ? clinicalDb.prepare(query).all(...params)
            : clinicalDb.prepare(query).all();
        sendJson(response, 200, {
          items: rows.map((r) => ({
            ...r,
            fullName: r.full_name,
            careUnit: r.ward,
            createdAt: r.created_at,
          })),
        });
        return;
      }

      if (
        request.method === "POST" &&
        requestUrl.pathname === "/api/patients"
      ) {
        const user = sessionFromRequest(request, authDb, secret);
        const body = await readJson(request);
        const result = clinicalDb
          .prepare(
            `
          INSERT INTO patients (full_name, age, gender, phone, email, department, diagnosis, prescription, ward, doctor, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
          )
          .run(
            body.fullName || body.full_name || "",
            Number(body.age) || 0,
            body.gender || "Unknown",
            body.phone || "",
            body.email || "",
            body.department || "General Medicine",
            body.diagnosis || "",
            body.prescription || "",
            body.careUnit || body.ward || "General",
            body.doctor || "",
            "registered",
            new Date(now()).toISOString(),
          );
        sendJson(response, 201, {
          id: result.lastInsertRowid,
          message: "Patient registered.",
        });
        return;
      }

      if (
        request.method === "PUT" &&
        requestUrl.pathname.startsWith("/api/patients/")
      ) {
        const user = sessionFromRequest(request, authDb, secret);
        const id = requestUrl.pathname.split("/").pop();
        const body = await readJson(request);
        clinicalDb
          .prepare(
            `
          UPDATE patients SET full_name = ?, age = ?, phone = ?, email = ?, gender = ?, diagnosis = ?, prescription = ?, doctor = ?
          WHERE id = ?
        `,
          )
          .run(
            body.fullName || body.full_name || "",
            Number(body.age) || 0,
            body.phone || "",
            body.email || "",
            body.gender || "Unknown",
            body.diagnosis || "",
            body.prescription || "",
            body.doctor || "",
            id,
          );
        sendJson(response, 200, { success: true });
        return;
      }

      if (
        request.method === "DELETE" &&
        requestUrl.pathname.startsWith("/api/patients/")
      ) {
        const user = sessionFromRequest(request, authDb, secret);
        const id = requestUrl.pathname.split("/").pop();
        clinicalDb.prepare("DELETE FROM patients WHERE id = ?").run(id);
        sendJson(response, 200, { success: true });
        return;
      }

      if (
        request.method === "GET" &&
        requestUrl.pathname === "/api/admissions"
      ) {
        const location = requestUrl.searchParams.get("location");
        let query = `
          SELECT a.*, COALESCE(a.phone, p.phone, '') AS phone, COALESCE(p.email, '') AS email, COALESCE(p.age, 0) AS age, COALESCE(p.gender, '') AS gender
          FROM admissions a
          LEFT JOIN patients p ON a.patient_id = p.id
        `;
        const params = [];
        if (location) {
          query += " WHERE (a.department = ? OR a.ward = ?)";
          params.push(location, location);
        }
        query += " ORDER BY a.created_at DESC, a.id DESC";

        const rows =
          params.length > 0
            ? clinicalDb.prepare(query).all(...params)
            : clinicalDb.prepare(query).all();
        sendJson(response, 200, {
          items: rows.map((r) => ({
            ...r,
            fullName: r.full_name,
            roomType: r.room_type,
            stay: r.stay_days,
            treatmentPlan: r.treatment_plan || "",
            medicines: r.medicines || "",
            injections: r.injections || "",
            bloodTests: r.blood_tests || "",
            otherTests: r.other_tests || "",
            paymentCleared: r.payment_status === "paid",
            createdAt: r.created_at,
          })),
        });
        return;
      }

      if (
        request.method === "POST" &&
        requestUrl.pathname === "/api/admissions"
      ) {
        const user = sessionFromRequest(request, authDb, secret);
        const body = await readJson(request);

        // Auto-create the patient first to satisfy the database foreign key constraint
        const pResult = clinicalDb
          .prepare(
            `INSERT INTO patients (full_name, age, gender, phone, email, department, ward, doctor, status, created_at) VALUES (?, ?, 'Unknown', ?, ?, ?, ?, ?, 'admitted', ?)`,
          )
          .run(
            body.fullName || "",
            Number(body.age) || 0,
            body.phone || "",
            body.email || "",
            body.department || "",
            body.department || "",
            body.doctor || "",
            new Date(now()).toISOString(),
          );

        const result = clinicalDb
          .prepare(
            `
          INSERT INTO admissions (patient_id, full_name, phone, department, ward, doctor, room_type, bed, diet, stay_days, payment_status, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'admitted', ?)
        `,
          )
          .run(
            pResult.lastInsertRowid,
            body.fullName || "",
            body.phone || "",
            body.department || "",
            body.department || "",
            body.doctor || "",
            body.roomType || "single",
            body.bed || "",
            body.diet || "Vegetarian",
            Number(body.stay) || 1,
            new Date(now()).toISOString(),
          );
        sendJson(response, 201, {
          id: result.lastInsertRowid,
          message: "Admission recorded.",
        });
        return;
      }

      if (
        request.method === "PUT" &&
        requestUrl.pathname.startsWith("/api/admissions/")
      ) {
        const user = sessionFromRequest(request, authDb, secret);
        const id = requestUrl.pathname.split("/").pop();
        const body = await readJson(request);

        if (body.paymentCleared !== undefined) {
          clinicalDb
            .prepare("UPDATE admissions SET payment_status = ? WHERE id = ?")
            .run(body.paymentCleared ? "paid" : "pending", id);
        } else if (
          body.treatmentPlan !== undefined ||
          body.medicines !== undefined
        ) {
          clinicalDb
            .prepare(
              `
            UPDATE admissions SET treatment_plan = ?, medicines = ?, injections = ?, blood_tests = ?, other_tests = ? WHERE id = ?
          `,
            )
            .run(
              body.treatmentPlan || "",
              body.medicines || "",
              body.injections || "",
              body.bloodTests || "",
              body.otherTests || "",
              id,
            );
        } else {
          clinicalDb
            .prepare(
              `
            UPDATE admissions SET full_name = ?, doctor = ?, room_type = ?, bed = ?, diet = ?, stay_days = ? WHERE id = ?
          `,
            )
            .run(
              body.fullName || "",
              body.doctor || "",
              body.roomType || "single",
              body.bed || "",
              body.diet || "Vegetarian",
              Number(body.stay) || 1,
              id,
            );
        }
        sendJson(response, 200, { success: true });
        return;
      }

      if (
        request.method === "DELETE" &&
        requestUrl.pathname.startsWith("/api/admissions/")
      ) {
        const user = sessionFromRequest(request, authDb, secret);
        const id = requestUrl.pathname.split("/").pop();
        clinicalDb.prepare("DELETE FROM admissions WHERE id = ?").run(id);
        sendJson(response, 200, { success: true });
        return;
      }

      if (route === "POST /api/auth/login") {
        if (!allowRequest(`login-ip:${ip}`, 20, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many sign-in attempts. Try again later.",
          );
        }
        const body = await readJson(request);
        const hospitalEmail = normalizeEmail(body.hospital_email || body.email);
        const password = typeof body.password === "string" ? body.password : "";
        const adminSecurityCode =
          typeof body.admin_security_code === "string"
            ? body.admin_security_code
            : typeof body.admin_passcode === "string"
              ? body.admin_passcode
              : "";
        const adminHash = String(env.ADMIN_ACCESS_CODE_HASH || "").trim();
        const isInstitutionalLogin = Boolean(
          hospitalEmail && hospitalEmail.endsWith("@evercare.com") && adminHash,
        );

        if (!isInstitutionalLogin) {
          const legacyUser = authDb
            .prepare(
              "SELECT id, full_name, email, phone, age, department, password_hash, role, is_active FROM users WHERE email = ? COLLATE NOCASE",
            )
            .get(hospitalEmail || normalizeEmail(body.email));
          if (!legacyUser?.is_active || !legacyUser.password_hash) {
            await verifyPassword(
              password || "invalid",
              await hashPassword(randomBytes(32).toString("base64url")),
            );
            throw new HttpError(
              401,
              "INVALID_CREDENTIALS",
              "Email or password is incorrect.",
            );
          }
          if (!(await verifyPassword(password, legacyUser.password_hash))) {
            throw new HttpError(
              401,
              "INVALID_CREDENTIALS",
              "Email or password is incorrect.",
            );
          }
          sendJson(response, 200, {
            token: signSession(legacyUser, secret, now()),
            user: publicUser(legacyUser),
          });
          return;
        }

        if (
          !hospitalEmail ||
          !hospitalEmail.endsWith("@evercare.com") ||
          password.length > 128
        ) {
          throw new HttpError(
            401,
            "INVALID_CREDENTIALS",
            "Use your official Evercare hospital email and password.",
          );
        }
        const user = authDb
          .prepare(
            "SELECT * FROM users WHERE hospital_email = ? COLLATE NOCASE AND is_active = 1",
          )
          .get(hospitalEmail);
        if (!user || !user.password_hash) {
          throw new HttpError(
            401,
            "INVALID_CREDENTIALS",
            "Email or password is incorrect.",
          );
        }
        if (!(await verifyPassword(password, user.password_hash))) {
          throw new HttpError(
            401,
            "INVALID_CREDENTIALS",
            "Email or password is incorrect.",
          );
        }
        if (!(await verifyAdminAccessCode(adminSecurityCode, adminHash))) {
          throw new HttpError(
            401,
            "INVALID_ADMIN_PASSCODE",
            "The admin security passcode is incorrect.",
          );
        }
        sendJson(response, 200, {
          token: signSession(user, secret, now()),
          user: publicUser(user),
        });
        return;
      }

      if (route === "POST /api/auth/register/request-otp") {
        if (!allowRequest(`register-ip:${ip}`, 10, 60 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many verification requests. Try again later.",
          );
        }
        if (!isSmsConfigured(env)) {
          throw new HttpError(
            503,
            "SMS_NOT_CONFIGURED",
            "SMS verification is not configured on this server.",
          );
        }
        const body = await readJson(request);
        const name = String(body.name || "").trim();
        const email = normalizeEmail(body.email);
        const phone = normalizePhone(body.phone);
        const age = body.age === undefined ? 18 : Number(body.age);
        const department = String(body.department || "General Medicine").trim();
        if (name.length < 2 || name.length > 100) {
          throw new HttpError(
            400,
            "INVALID_NAME",
            "Enter a name between 2 and 100 characters.",
          );
        }
        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new HttpError(
            400,
            "INVALID_EMAIL",
            "Enter a valid email address.",
          );
        }
        if (!isValidE164(phone)) {
          throw new HttpError(
            400,
            "INVALID_PHONE",
            "Enter the mobile number in E.164 format, for example +14155552671.",
          );
        }
        if (!Number.isInteger(age) || age < 1 || age > 120) {
          throw new HttpError(
            400,
            "INVALID_AGE",
            "Age must be a whole number between 1 and 120.",
          );
        }
        if (!department || department.length > 120) {
          throw new HttpError(
            400,
            "INVALID_DEPARTMENT",
            "Enter a valid department name.",
          );
        }
        if (!allowRequest(`register-phone:${phone}`, 3, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many verification requests for this number. Try again later.",
          );
        }
        if (!validatePassword(body.password)) {
          throw new HttpError(
            400,
            "WEAK_PASSWORD",
            "Password must be 12-128 characters and include uppercase, lowercase, number, and symbol characters.",
          );
        }
        const existingUser = authDb
          .prepare(
            "SELECT id FROM users WHERE email = ? COLLATE NOCASE OR phone = ? LIMIT 1",
          )
          .get(email, phone);
        if (existingUser) {
          throw new HttpError(
            409,
            "ACCOUNT_EXISTS",
            "An account already uses that email address or phone number.",
          );
        }

        const passwordHash = await hashPassword(body.password);
        const challengeId = randomUUID();
        const code = generateOtp();
        const createdAt = new Date(now()).toISOString();
        authDb.prepare("DELETE FROM otp_challenges WHERE phone = ?").run(phone);
        authDb
          .prepare(
            `
          INSERT INTO otp_challenges (
            id, full_name, email, phone, age, department, password_hash, otp_hash, expires_at, attempts, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
        `,
          )
          .run(
            challengeId,
            name,
            email,
            phone,
            age,
            department,
            passwordHash,
            hashOtp(code, challengeId, secret),
            now() + otpTtlSeconds * 1000,
            createdAt,
          );
        try {
          await smsSender(phone, code, env, otpTtlSeconds);
        } catch {
          authDb
            .prepare("DELETE FROM otp_challenges WHERE id = ?")
            .run(challengeId);
          throw new HttpError(
            502,
            "SMS_DELIVERY_FAILED",
            "The verification message could not be delivered. Try again later.",
          );
        }
        sendJson(response, 202, {
          challengeId,
          message:
            "If delivery is available, a verification code has been sent to your phone.",
          expiresInSeconds: otpTtlSeconds,
        });
        return;
      }

      if (route === "POST /api/auth/register/resend-otp") {
        if (!isSmsConfigured(env)) {
          throw new HttpError(
            503,
            "SMS_NOT_CONFIGURED",
            "SMS verification is not configured on this server.",
          );
        }
        if (!allowRequest(`resend-ip:${ip}`, 10, 60 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many resend requests. Try again later.",
          );
        }
        const body = await readJson(request);
        const phone = normalizePhone(body.phone);
        const challengeId = String(body.challengeId || "");
        if (!isValidE164(phone) || !challengeId) {
          throw new HttpError(
            400,
            "INVALID_CHALLENGE",
            "Enter the phone number and challenge ID.",
          );
        }
        if (!allowRequest(`resend-phone:${phone}`, 3, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many codes were sent to this number. Try again later.",
          );
        }
        const challenge = authDb
          .prepare(
            "SELECT id, phone, expires_at, attempts FROM otp_challenges WHERE id = ? AND phone = ?",
          )
          .get(challengeId, phone);
        if (
          !challenge ||
          challenge.expires_at <= now() ||
          challenge.attempts >= OTP_ATTEMPT_LIMIT
        ) {
          if (challenge)
            authDb
              .prepare("DELETE FROM otp_challenges WHERE id = ?")
              .run(challengeId);
          throw new HttpError(
            400,
            "INVALID_OR_EXPIRED_CHALLENGE",
            "This registration has expired. Start again to receive a new code.",
          );
        }

        const code = generateOtp();
        authDb
          .prepare(
            `
                  UPDATE otp_challenges SET otp_hash = ?, expires_at = ?, attempts = 0, created_at = ?
                  WHERE id = ?
                `,
          )
          .run(
            hashOtp(code, challengeId, secret),
            now() + otpTtlSeconds * 1000,
            new Date(now()).toISOString(),
            challengeId,
          );
        try {
          await smsSender(phone, code, env, otpTtlSeconds);
        } catch {
          authDb
            .prepare("DELETE FROM otp_challenges WHERE id = ?")
            .run(challengeId);
          throw new HttpError(
            502,
            "SMS_DELIVERY_FAILED",
            "The verification message could not be delivered. Start registration again later.",
          );
        }
        sendJson(response, 202, {
          challengeId,
          message:
            "If delivery is available, a new verification code has been sent to your phone.",
          expiresInSeconds: otpTtlSeconds,
        });
        return;
      }

      if (route === "POST /api/auth/register/verify-otp") {
        if (!allowRequest(`verify-ip:${ip}`, 30, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many verification attempts. Try again later.",
          );
        }
        const body = await readJson(request);
        const phone = normalizePhone(body.phone);
        const challengeId = String(body.challengeId || "");
        const code = String(body.code || "");
        if (!isValidE164(phone) || !challengeId || !/^\d{6}$/.test(code)) {
          throw new HttpError(
            400,
            "INVALID_VERIFICATION",
            "Enter the phone, challenge ID, and six-digit verification code.",
          );
        }
        const challenge = authDb
          .prepare("SELECT * FROM otp_challenges WHERE id = ? AND phone = ?")
          .get(challengeId, phone);
        if (!challenge || challenge.attempts >= OTP_ATTEMPT_LIMIT) {
          if (challenge)
            authDb
              .prepare("DELETE FROM otp_challenges WHERE id = ?")
              .run(challengeId);
          throw new HttpError(
            400,
            "INVALID_OR_EXPIRED_CODE",
            "The verification code is invalid or expired. Request a new code.",
          );
        }
        if (
          !safeHashEqual(
            challenge.otp_hash,
            hashOtp(code, challenge.id, secret),
          )
        ) {
          const attempts = challenge.attempts + 1;
          if (attempts >= OTP_ATTEMPT_LIMIT) {
            authDb
              .prepare("DELETE FROM otp_challenges WHERE id = ?")
              .run(challengeId);
          } else {
            authDb
              .prepare("UPDATE otp_challenges SET attempts = ? WHERE id = ?")
              .run(attempts, challengeId);
          }
          throw new HttpError(
            400,
            "INVALID_OR_EXPIRED_CODE",
            "The verification code is invalid or expired. Request a new code.",
          );
        }

        const user = {
          id: randomUUID(),
          full_name: challenge.full_name,
          email: challenge.email,
          phone: challenge.phone,
          age: challenge.age,
          department: challenge.department,
          role: "patient",
        };
        try {
          inTransaction(authDb, () => {
            authDb
              .prepare(
                `
              INSERT INTO users (id, full_name, email, phone, age, department, password_hash, role, is_active, is_seeded, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, 'patient', 1, 0, ?)
            `,
              )
              .run(
                user.id,
                user.full_name,
                user.email,
                user.phone,
                user.age,
                user.department,
                challenge.password_hash,
                new Date(now()).toISOString(),
              );
            authDb
              .prepare("DELETE FROM otp_challenges WHERE id = ?")
              .run(challenge.id);
          });
        } catch {
          authDb
            .prepare("DELETE FROM otp_challenges WHERE id = ?")
            .run(challenge.id);
          throw new HttpError(
            409,
            "ACCOUNT_EXISTS",
            "An account already uses that email address or phone number.",
          );
        }
        sendJson(response, 201, {
          token: signSession(user, secret, now()),
          user: publicUser(user),
        });
        return;
      }

      if (route === "POST /api/auth/login") {
        if (!allowRequest(`login-ip:${ip}`, 20, 15 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many sign-in attempts. Try again later.",
          );
        }
        const body = await readJson(request);
        const email = normalizeEmail(body.email);
        const password = typeof body.password === "string" ? body.password : "";
        if (!email || password.length > 128) {
          throw new HttpError(
            400,
            "INVALID_CREDENTIALS",
            "Email or password is incorrect.",
          );
        }
        const user = authDb
          .prepare(
            "SELECT id, full_name, email, phone, age, department, password_hash, role, is_active FROM users WHERE email = ? COLLATE NOCASE",
          )
          .get(email);
        if (!user?.is_active || !user.password_hash) {
          await verifyPassword(
            password || "invalid",
            await dummyPasswordHash(),
          );
          throw new HttpError(
            401,
            "INVALID_CREDENTIALS",
            "Email or password is incorrect.",
          );
        }
        if (!(await verifyPassword(password, user.password_hash))) {
          throw new HttpError(
            401,
            "INVALID_CREDENTIALS",
            "Email or password is incorrect.",
          );
        }
        sendJson(response, 200, {
          token: signSession(user, secret, now()),
          user: publicUser(user),
        });
        return;
      }

      if (route === "GET /api/inventory") {
        const { page, limit, offset } = pagination(requestUrl);
        const result = clinicalDb
          .prepare("SELECT COUNT(*) AS count FROM medicines")
          .get();
        const rows = clinicalDb
          .prepare("SELECT * FROM medicines ORDER BY name, id LIMIT ? OFFSET ?")
          .all(limit, offset);
        sendJson(response, 200, {
          page,
          limit,
          total: Number(result.count),
          items: rows.map(medicineView),
        });
        return;
      }

      if (route === "POST /api/orders") {
        const user = sessionFromRequest(request, authDb, secret);
        if (!allowRequest(`order-user:${user.id}`, 40, 60 * 60_000)) {
          throw new HttpError(
            429,
            "RATE_LIMITED",
            "Too many orders. Try again later.",
          );
        }
        const body = await readJson(request);
        if (
          !Array.isArray(body.items) ||
          body.items.length === 0 ||
          body.items.length > 10
        ) {
          throw new HttpError(
            400,
            "INVALID_ITEMS",
            "Include between 1 and 10 distinct medicine items.",
          );
        }
        const items = body.items.map((item) => ({
          medicineId: Number(item?.medicineId),
          quantity: Number(item?.quantity),
        }));
        const totalUnits = items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        if (
          items.some(
            (item) =>
              !Number.isSafeInteger(item.medicineId) ||
              item.medicineId < 1 ||
              !Number.isSafeInteger(item.quantity) ||
              item.quantity < 1,
          ) ||
          new Set(items.map((item) => item.medicineId)).size !== items.length
        ) {
          throw new HttpError(
            400,
            "INVALID_ITEMS",
            "Medicine IDs must be unique and each quantity must be a positive integer.",
          );
        }
        if (totalUnits > 10) {
          throw new HttpError(
            400,
            "ORDER_LIMIT_EXCEEDED",
            "An order cannot contain more than 10 medicine units.",
          );
        }

        const orderId = randomUUID();
        let totalCents = 0;
        clinicalDb.exec("BEGIN IMMEDIATE");
        try {
          const getMedicine = clinicalDb.prepare(
            "SELECT * FROM medicines WHERE id = ?",
          );
          const reduceStock = clinicalDb.prepare(
            "UPDATE medicines SET stock_quantity = stock_quantity - ?, updated_at = ? WHERE id = ? AND stock_quantity >= ?",
          );
          const insertOrderItem = clinicalDb.prepare(`
            INSERT INTO medicine_order_items (order_id, medicine_id, name_snapshot, quantity, unit_price_cents)
            VALUES (?, ?, ?, ?, ?)
          `);
          const orderItems = [];
          for (const item of items) {
            const medicine = getMedicine.get(item.medicineId);
            if (!medicine)
              throw new HttpError(
                404,
                "MEDICINE_NOT_FOUND",
                "A selected medicine is not available.",
              );
            if (medicine.stock_quantity < item.quantity) {
              throw new HttpError(
                409,
                "INSUFFICIENT_STOCK",
                `${medicine.name} does not have enough stock for this order.`,
              );
            }
            if (medicine.prescription_required) {
              throw new HttpError(
                409,
                "PRESCRIPTION_REVIEW_REQUIRED",
                `${medicine.name} requires prescription review before it can be ordered.`,
              );
            }
            const result = reduceStock.run(
              item.quantity,
              new Date(now()).toISOString(),
              medicine.id,
              item.quantity,
            );
            if (result.changes !== 1)
              throw new HttpError(
                409,
                "INSUFFICIENT_STOCK",
                `${medicine.name} stock changed. Review the order and try again.`,
              );
            totalCents += medicine.price_cents * item.quantity;
            orderItems.push({ medicine, quantity: item.quantity });
          }
          clinicalDb
            .prepare(
              `
            INSERT INTO medicine_orders (id, user_id, status, payment_status, total_cents, created_at)
            VALUES (?, ?, 'placed', 'pending', ?, ?)
          `,
            )
            .run(orderId, user.id, totalCents, new Date(now()).toISOString());
          for (const { medicine, quantity } of orderItems) {
            insertOrderItem.run(
              orderId,
              medicine.id,
              medicine.name,
              quantity,
              medicine.price_cents,
            );
          }
          clinicalDb.exec("COMMIT");
        } catch (error) {
          clinicalDb.exec("ROLLBACK");
          throw error;
        }
        sendJson(response, 201, {
          order: {
            id: orderId,
            status: "placed",
            paymentStatus: "pending",
            totalCents,
          },
        });
        return;
      }

      if (route === "GET /api/staff/patient-records") {
        const user = sessionFromRequest(request, authDb, secret);
        if (user.role !== "staff")
          throw new HttpError(403, "FORBIDDEN", "Staff access is required.");
        const kind = requestUrl.searchParams.get("kind") || "registered";
        if (kind !== "registered" && kind !== "admitted") {
          throw new HttpError(
            400,
            "INVALID_RECORD_KIND",
            "Kind must be registered or admitted.",
          );
        }
        const { page, limit, offset } = pagination(requestUrl);
        const count = clinicalDb
          .prepare(
            "SELECT COUNT(*) AS count FROM patient_records WHERE record_kind = ?",
          )
          .get(kind);
        const rows = clinicalDb
          .prepare(
            "SELECT * FROM patient_records WHERE record_kind = ? ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?",
          )
          .all(kind, limit, offset);
        sendJson(response, 200, {
          kind,
          page,
          limit,
          total: Number(count.count),
          items: rows.map(patientView),
        });
        return;
      }

      throw new HttpError(404, "NOT_FOUND", "Route not found.");
    } catch (error) {
      if (error instanceof HttpError) {
        sendJson(response, error.status, {
          error: { code: error.code, message: error.message },
        });
        return;
      }
      console.error("Unhandled API error:", error);
      sendJson(response, 500, {
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected server error occurred.",
        },
      });
    }
  }

  return createServer((request, response) => {
    void handle(request, response);
  });
}
