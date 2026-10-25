import fs from "fs";
import { authDb, clinicalDb } from "./src/database.js";

// 1. Read admin credentials from .env
let envText = "";
try {
  envText = fs.readFileSync(".env", "utf8");
} catch (e) {}

const getEnv = (key) => {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, "m"));
  return match ? match[1].trim().replace(/^['"]|['"]$/g, "") : "";
};

const adminEmail = (
  getEnv("ADMIN_EMAIL") || "admin@evercare.com"
).toLowerCase();
const adminPhone = getEnv("ADMIN_PHONE") || "9820112233";

console.log("==================================================");
console.log("             EVERCARE DIAGNOSIS & RESOLVER         ");
console.log("==================================================");
console.log(`Configured Admin Email : "${adminEmail}"`);
console.log(`Configured Admin Phone : "${adminPhone}"\n`);

// Helper to query sqlite with Promises
const dbAll = (db, sql, params = []) =>
  new Promise((resolve) => {
    db.all(sql, params, (err, rows) => {
      if (err) resolve({ error: err.message });
      else resolve(rows || []);
    });
  });

const dbRun = (db, sql, params = []) =>
  new Promise((resolve) => {
    db.run(sql, params, function (err) {
      if (err) resolve({ error: err.message, changes: 0 });
      else resolve({ changes: this.changes });
    });
  });

async function runDiagnosisAndResolution() {
  // --- DIAGNOSIS: BEFORE ---
  console.log(">>> [1/4] INITIAL DATABASE INSPECTION");

  const initialUsers = await dbAll(
    authDb,
    "SELECT id, first_name, last_name, email, personal_email, hospital_email, phone, role FROM users",
  );
  console.log("--- USERS in auth.sqlite (Before) ---");
  if (initialUsers.error)
    console.log("Notice on users table:", initialUsers.error);
  else console.table(initialUsers);

  const initialPatients = await dbAll(
    clinicalDb,
    "SELECT id, fullName, email, phone, careUnit FROM patients",
  );
  console.log("--- PATIENTS in clinical.sqlite (Before) ---");
  if (initialPatients.error)
    console.log("Notice on patients table:", initialPatients.error);
  else console.table(initialPatients);

  // --- RESOLUTION: MIGRATIONS & FIXES ---
  console.log("\n>>> [2/4] APPLYING DATABASE MIGRATIONS");

  // Ensure necessary columns exist in auth.sqlite
  await dbRun(authDb, "ALTER TABLE users ADD COLUMN email TEXT");
  await dbRun(authDb, "ALTER TABLE users ADD COLUMN phone TEXT");
  await dbRun(authDb, "ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'staff'");

  // Update all accounts to role: 'staff' and sync email
  const userFix = await dbRun(
    authDb,
    "UPDATE users SET role = 'staff', email = COALESCE(hospital_email, personal_email) WHERE role != 'staff' OR email IS NULL OR email = ''",
  );
  console.log(
    `✓ Updated ${userFix.changes || 0} user record(s) in auth.sqlite to role: 'staff' with email synced.`,
  );

  // Clear conflicting patients sharing admin email or phone in clinical.sqlite
  console.log("\n>>> [3/4] CHECKING & REMOVING CONFLICTING PATIENT RECORDS");
  const patientFix = await dbRun(
    clinicalDb,
    "DELETE FROM patients WHERE LOWER(email) = ? OR phone = ?",
    [adminEmail, adminPhone],
  );
  if (patientFix.changes > 0) {
    console.log(
      `✓ Removed ${patientFix.changes} conflicting patient record(s) matching admin credentials from clinical.sqlite.`,
    );
  } else {
    console.log("✓ No conflicting patient records found in clinical.sqlite.");
  }

  // --- DIAGNOSIS: AFTER ---
  console.log("\n>>> [4/4] POST-FIX VERIFICATION");

  const verifiedUsers = await dbAll(
    authDb,
    "SELECT id, email, hospital_email, phone, role FROM users",
  );
  console.log("--- USERS in auth.sqlite (After) ---");
  console.table(verifiedUsers);

  const verifiedPatients = await dbAll(
    clinicalDb,
    "SELECT id, fullName, email, phone FROM patients",
  );
  console.log("--- PATIENTS in clinical.sqlite (After) ---");
  console.table(verifiedPatients);

  console.log("==================================================");
  console.log("  Diagnosis & resolution completed successfully!  ");
  console.log("==================================================");

  setTimeout(() => process.exit(0), 200);
}

runDiagnosisAndResolution();
