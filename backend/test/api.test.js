import assert from "node:assert/strict";
import bcrypt from "bcrypt";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createApiServer } from "../src/app.js";
import { createDatabasePair, initializeDatabases } from "../src/database.js";
import { hashPassword, signSession } from "../src/security.js";

const JWT_SECRET = "test-only-secret-with-at-least-32-characters-long";
const SMS_ENV = {
  JWT_SECRET,
  OTP_TTL_SECONDS: "300",
  TWILIO_ACCOUNT_SID: "AC-test",
  TWILIO_AUTH_TOKEN: "test-token",
  TWILIO_FROM_NUMBER: "+14155550100",
  CORS_ORIGINS: "http://localhost:5500",
};

async function createFixture({ env = SMS_ENV, smsSender, emailSender } = {}) {
  const directory = mkdtempSync(join(tmpdir(), "evercare-api-test-"));
  const { authDb, clinicalDb } = createDatabasePair(directory);
  initializeDatabases(authDb, clinicalDb);
  const server = createApiServer({
    authDb,
    clinicalDb,
    env,
    smsSender: smsSender || (async () => {}),
    emailSender: emailSender || (async () => {}),
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  return {
    authDb,
    clinicalDb,
    baseUrl,
    async close() {
      await new Promise((resolve) => server.close(resolve));
      authDb.close();
      clinicalDb.close();
      rmSync(directory, { recursive: true, force: true });
    },
  };
}

async function postJson(baseUrl, path, data, token) {
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
}

async function makeUser(authDb, { id, role = "patient", email, phone }) {
  const passwordHash = await hashPassword("Example-Password-2046!");
  authDb.prepare(`
    INSERT INTO users (id, full_name, email, phone, password_hash, role, is_active, is_seeded, created_at)
    VALUES (?, 'Test User', ?, ?, ?, ?, 1, 0, ?)
  `).run(id, email, phone, passwordHash, role, new Date().toISOString());
  return { id, email, role };
}

test("hospital staff onboarding uses email OTP and admin passcode verification", async (t) => {
  const deliveredCodes = [];
  const env = {
    ...SMS_ENV,
    ADMIN_ACCESS_CODE_HASH: await bcrypt.hash("01605", 10),
  };
  const fixture = await createFixture({
    env,
    emailSender: async (_email, code) => {
      deliveredCodes.push(code);
    },
  });
  t.after(() => fixture.close());

  const sendOtp = await postJson(fixture.baseUrl, "/api/auth/send-otp", {
    first_name: "Gaurav",
    last_name: "Sharma",
    personal_email: "gaurav@example.com",
    department: "Cardiology",
  });
  const otpPayload = await sendOtp.json();
  assert.equal(sendOtp.status, 202);
  assert.ok(otpPayload.challengeId);
  assert.equal(deliveredCodes.length, 1);

  const verifyOtp = await postJson(fixture.baseUrl, "/api/auth/verify-otp", {
    personal_email: "gaurav@example.com",
    challengeId: otpPayload.challengeId,
    code: deliveredCodes[0],
  });
  const verification = await verifyOtp.json();
  assert.equal(verifyOtp.status, 200);
  assert.equal(verification.verified, true);
  assert.ok(verification.verificationToken);

  const register = await postJson(fixture.baseUrl, "/api/auth/register", {
    first_name: "Gaurav",
    last_name: "Sharma",
    personal_email: "gaurav@example.com",
    password: "Example-Password-2046!",
    department: "Cardiology",
    verificationToken: verification.verificationToken,
  });
  const created = await register.json();
  assert.equal(register.status, 201);
  assert.match(created.user.hospital_email, /^gaurav\d{3}@evercare\.com$/);

  const login = await postJson(fixture.baseUrl, "/api/auth/login", {
    hospital_email: created.user.hospital_email,
    password: "Example-Password-2046!",
    admin_security_code: "01605",
  });
  assert.equal(login.status, 200);
  const session = await login.json();
  assert.equal(session.user.hospital_email, created.user.hospital_email);
  assert.ok(session.token);
});

test("health and inventory endpoints expose stock state", async (t) => {
  const fixture = await createFixture();
  t.after(() => fixture.close());
  fixture.clinicalDb.prepare(`
    INSERT INTO medicines (name, generic_name, category, strength, price_cents, stock_quantity, reorder_level, prescription_required, updated_at)
    VALUES ('Paracetamol 500 mg', 'Paracetamol', 'Analgesic', '500 mg', 2500, 0, 12, 0, ?)
  `).run(new Date().toISOString());

  const health = await fetch(`${fixture.baseUrl}/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, "ok");

  const inventory = await fetch(`${fixture.baseUrl}/api/inventory`);
  const result = await inventory.json();
  assert.equal(inventory.status, 200);
  assert.equal(result.total, 1);
  assert.equal(result.items[0].stockQuantity, 0);
  assert.equal(result.items[0].inStock, false);
});

test("registration delivers and resends OTP privately, then activates the account", async (t) => {
  const deliveredCodes = [];
  let delivered;
  const fixture = await createFixture({
    smsSender: async (phone, code) => {
      delivered = { phone, code };
      deliveredCodes.push(code);
    },
  });
  t.after(() => fixture.close());

  const request = await postJson(fixture.baseUrl, "/api/auth/register/request-otp", {
    name: "Jamie Example",
    email: "Jamie@example.com",
    phone: "+14155552671",
    age: 24,
    department: "Cardiology",
    password: "Example-Password-2046!",
  });
  const challenge = await request.json();
  assert.equal(request.status, 202);
  assert.equal(delivered.phone, "+14155552671");
  assert.equal(JSON.stringify(challenge).includes(delivered.code), false);
  assert.equal(fixture.authDb.prepare("SELECT COUNT(*) AS count FROM users WHERE is_active = 1").get().count, 0);

  const resend = await postJson(fixture.baseUrl, "/api/auth/register/resend-otp", {
    phone: delivered.phone,
    challengeId: challenge.challengeId,
  });
  assert.equal(resend.status, 202);
  assert.equal(deliveredCodes.length, 2);
  assert.equal(JSON.stringify(await resend.json()).includes(delivered.code), false);

  const invalid = await postJson(fixture.baseUrl, "/api/auth/register/verify-otp", {
    phone: delivered.phone,
    challengeId: challenge.challengeId,
    code: deliveredCodes[0] === "999999" ? "999998" : "999999",
  });
  assert.equal(invalid.status, 400);

  const verified = await postJson(fixture.baseUrl, "/api/auth/register/verify-otp", {
    phone: delivered.phone,
    challengeId: challenge.challengeId,
    code: delivered.code,
  });
  const session = await verified.json();
  assert.equal(verified.status, 201);
  assert.equal(session.user.email, "jamie@example.com");
  assert.equal(session.user.age, 24);
  assert.equal(session.user.department, "Cardiology");
  assert.equal("password" in session.user, false);
  assert.equal(fixture.authDb.prepare("SELECT COUNT(*) AS count FROM users WHERE is_active = 1").get().count, 1);
  assert.equal(fixture.authDb.prepare("SELECT COUNT(*) AS count FROM otp_challenges").get().count, 0);
});

test("registration fails closed when SMS is not configured", async (t) => {
  const fixture = await createFixture({ env: { JWT_SECRET } });
  t.after(() => fixture.close());

  const response = await postJson(fixture.baseUrl, "/api/auth/register/request-otp", {
    name: "Jamie Example",
    email: "jamie@example.com",
    phone: "+14155552671",
    password: "Example-Password-2046!",
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error.code, "SMS_NOT_CONFIGURED");
});

test("login uses password hashes and denies seeded inactive accounts", async (t) => {
  const fixture = await createFixture();
  t.after(() => fixture.close());
  const passwordHash = await hashPassword("Example-Password-2046!");
  fixture.authDb.prepare(`
    INSERT INTO users (id, full_name, email, phone, password_hash, role, is_active, is_seeded, created_at)
    VALUES ('login-user', 'Login User', 'login@example.com', '+14155552672', ?, 'patient', 1, 0, ?)
  `).run(passwordHash, new Date().toISOString());
  fixture.authDb.prepare(`
    INSERT INTO users (id, full_name, email, phone, password_hash, role, is_active, is_seeded, created_at)
    VALUES ('seed-user', 'Seed User', 'seed@example.invalid', '+14155552673', NULL, 'patient', 0, 1, ?)
  `).run(new Date().toISOString());

  const success = await postJson(fixture.baseUrl, "/api/auth/login", {
    email: "LOGIN@example.com",
    password: "Example-Password-2046!",
  });
  assert.equal(success.status, 200);
  assert.ok((await success.json()).token);

  const wrongPassword = await postJson(fixture.baseUrl, "/api/auth/login", {
    email: "login@example.com",
    password: "not-the-password",
  });
  assert.equal(wrongPassword.status, 401);

  const seeded = await postJson(fixture.baseUrl, "/api/auth/login", {
    email: "seed@example.invalid",
    password: "Example-Password-2046!",
  });
  assert.equal(seeded.status, 401);
});

test("orders enforce a 10-unit cap, prescription rules, and atomic stock checks", async (t) => {
  const fixture = await createFixture();
  t.after(() => fixture.close());
  const user = await makeUser(fixture.authDb, {
    id: "ordering-user",
    email: "order@example.com",
    phone: "+14155552674",
  });
  const token = signSession(user, JWT_SECRET);
  const now = new Date().toISOString();
  const insertMedicine = fixture.clinicalDb.prepare(`
    INSERT INTO medicines (name, generic_name, category, strength, price_cents, stock_quantity, reorder_level, prescription_required, updated_at)
    VALUES (?, ?, 'Test', '10 mg', 1000, ?, 5, ?, ?)
  `);
  insertMedicine.run("Available medicine", "Available", 4, 0, now);
  insertMedicine.run("No-stock medicine", "Unavailable", 0, 0, now);
  insertMedicine.run("Prescription medicine", "Prescription", 5, 1, now);

  const capExceeded = await postJson(fixture.baseUrl, "/api/orders", {
    items: [{ medicineId: 1, quantity: 11 }],
  }, token);
  assert.equal(capExceeded.status, 400);
  assert.equal((await capExceeded.json()).error.code, "ORDER_LIMIT_EXCEEDED");

  const insufficient = await postJson(fixture.baseUrl, "/api/orders", {
    items: [{ medicineId: 1, quantity: 5 }],
  }, token);
  assert.equal(insufficient.status, 409);
  assert.equal(fixture.clinicalDb.prepare("SELECT stock_quantity FROM medicines WHERE id = 1").get().stock_quantity, 4);

  const prescription = await postJson(fixture.baseUrl, "/api/orders", {
    items: [{ medicineId: 3, quantity: 1 }],
  }, token);
  assert.equal(prescription.status, 409);
  assert.equal((await prescription.json()).error.code, "PRESCRIPTION_REVIEW_REQUIRED");

  const accepted = await postJson(fixture.baseUrl, "/api/orders", {
    items: [{ medicineId: 1, quantity: 4 }],
  }, token);
  assert.equal(accepted.status, 201);
  assert.equal(fixture.clinicalDb.prepare("SELECT stock_quantity FROM medicines WHERE id = 1").get().stock_quantity, 0);

  const unavailable = await postJson(fixture.baseUrl, "/api/orders", {
    items: [{ medicineId: 1, quantity: 1 }],
  }, token);
  assert.equal(unavailable.status, 409);
});

test("patient records remain staff-only", async (t) => {
  const fixture = await createFixture();
  t.after(() => fixture.close());
  const patient = await makeUser(fixture.authDb, {
    id: "patient-user",
    email: "patient@example.com",
    phone: "+14155552675",
  });
  const staff = await makeUser(fixture.authDb, {
    id: "staff-user",
    role: "staff",
    email: "staff@example.com",
    phone: "+14155552676",
  });
  const baseValues = [
    "admitted", "Taylor Patient", 49, "female", "+14155552677",
    "patient-record@example.invalid", "Cardiology", "Dr. A. Mehta", "Observation",
    new Date().toISOString(), null, "", null, "admitted", "DEMO-TXN-TEST", "pending", 100_000,
    new Date().toISOString(),
  ];
  fixture.clinicalDb.prepare(`
    INSERT INTO patient_records (
      record_kind, full_name, age, gender, phone, email, ward, doctor, diagnosis,
      admitted_at, discharged_at, operation_name, operation_date, status,
      transaction_id, transaction_status, amount_cents, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(...baseValues);

  const denied = await fetch(`${fixture.baseUrl}/api/staff/patient-records?kind=admitted`, {
    headers: { Authorization: `Bearer ${signSession(patient, JWT_SECRET)}` },
  });
  assert.equal(denied.status, 403);

  const allowed = await fetch(`${fixture.baseUrl}/api/staff/patient-records?kind=admitted`, {
    headers: { Authorization: `Bearer ${signSession(staff, JWT_SECRET)}` },
  });
  const result = await allowed.json();
  assert.equal(allowed.status, 200);
  assert.equal(result.total, 1);
  assert.equal(result.items[0].ward, "Cardiology");
  assert.equal(result.items[0].status, "admitted");
});
