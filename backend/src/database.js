import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const backendDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDirectory = resolve(backendDirectory, "data");
mkdirSync(dataDirectory, { recursive: true });

function openDatabase(directory, filename) {
  const database = new DatabaseSync(resolve(directory, filename));
  database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");
  return database;
}

export function createDatabasePair(directory = dataDirectory) {
  mkdirSync(directory, { recursive: true });
  return {
    authDb: openDatabase(directory, "auth.sqlite"),
    clinicalDb: openDatabase(directory, "clinical.sqlite"),
  };
}

const defaultDatabases = createDatabasePair();
export const authDb = defaultDatabases.authDb;
export const clinicalDb = defaultDatabases.clinicalDb;

export function inTransaction(database, callback) {
  database.exec("BEGIN IMMEDIATE");
  try {
    const result = callback();
    database.exec("COMMIT");
    return result;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

export function initializeDatabases(
  targetAuthDb = authDb,
  targetClinicalDb = clinicalDb,
) {
  const ensureLegacyTableCompatibility = (
    database,
    tableName,
    desiredCreateSql,
    preferredColumns,
  ) => {
    const info = database.prepare(`PRAGMA table_info(${tableName})`).all();
    if (info.length === 0) {
      database.exec(desiredCreateSql);
      return;
    }

    const columnNames = new Set(info.map((column) => column.name));
    const requiresRebuild =
      preferredColumns.some((column) => !columnNames.has(column)) ||
      info.some(
        (column) =>
          column.notnull &&
          ["phone", "email", "full_name", "department"].includes(column.name),
      );

    if (!requiresRebuild) return;

    const rows = database.prepare(`SELECT * FROM ${tableName}`).all();
    const tempName = `${tableName}__migrated`;
    database.exec(`ALTER TABLE ${tableName} RENAME TO ${tempName}`);
    database.exec(desiredCreateSql);
    if (rows.length) {
      const targetColumns = database
        .prepare(`PRAGMA table_info(${tableName})`)
        .all()
        .map((column) => column.name);
      const insertColumns = targetColumns.join(", ");
      const selectColumns = targetColumns
        .map((column) => `legacy.${column}`)
        .join(", ");
      database.exec(
        `INSERT INTO ${tableName} (${insertColumns}) SELECT ${selectColumns} FROM ${tempName} AS legacy`,
      );
    }
    database.exec(`DROP TABLE ${tempName}`);
  };

  ensureLegacyTableCompatibility(
    targetAuthDb,
    "users",
    `
      CREATE TABLE users (
        id TEXT PRIMARY KEY,
        full_name TEXT,
        first_name TEXT,
        last_name TEXT,
        email TEXT COLLATE NOCASE,
        personal_email TEXT COLLATE NOCASE,
        hospital_email TEXT COLLATE NOCASE,
        phone TEXT,
        age INTEGER CHECK (age IS NULL OR age BETWEEN 1 AND 120),
        department TEXT,
        password_hash TEXT,
        role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'staff')),
        is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
        is_seeded INTEGER NOT NULL DEFAULT 0 CHECK (is_seeded IN (0, 1)),
        created_at TEXT NOT NULL
      );
    `,
    [
      "id",
      "full_name",
      "first_name",
      "last_name",
      "email",
      "personal_email",
      "hospital_email",
      "phone",
      "age",
      "department",
      "password_hash",
      "role",
      "is_active",
      "is_seeded",
      "created_at",
    ],
  );

  ensureLegacyTableCompatibility(
    targetAuthDb,
    "otp_challenges",
    `
      CREATE TABLE otp_challenges (
        id TEXT PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        full_name TEXT,
        email TEXT COLLATE NOCASE,
        personal_email TEXT COLLATE NOCASE,
        phone TEXT,
        age INTEGER,
        department TEXT,
        password_hash TEXT,
        otp_hash TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );
    `,
    [
      "id",
      "first_name",
      "last_name",
      "full_name",
      "email",
      "personal_email",
      "phone",
      "age",
      "department",
      "password_hash",
      "otp_hash",
      "expires_at",
      "attempts",
      "created_at",
    ],
  );

  const addColumnIfMissing = (database, table, column, definition) => {
    const columns = database.prepare(`PRAGMA table_info(${table})`).all();
    if (!columns.some((entry) => entry.name === column)) {
      database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    }
  };

  addColumnIfMissing(targetAuthDb, "users", "first_name", "TEXT");
  addColumnIfMissing(targetAuthDb, "users", "last_name", "TEXT");
  addColumnIfMissing(
    targetAuthDb,
    "users",
    "personal_email",
    "TEXT COLLATE NOCASE",
  );
  addColumnIfMissing(
    targetAuthDb,
    "users",
    "hospital_email",
    "TEXT COLLATE NOCASE",
  );
  addColumnIfMissing(
    targetAuthDb,
    "users",
    "age",
    "INTEGER CHECK (age IS NULL OR age BETWEEN 1 AND 120)",
  );
  addColumnIfMissing(targetAuthDb, "users", "department", "TEXT");
  addColumnIfMissing(targetAuthDb, "otp_challenges", "first_name", "TEXT");
  addColumnIfMissing(targetAuthDb, "otp_challenges", "last_name", "TEXT");
  addColumnIfMissing(targetAuthDb, "otp_challenges", "full_name", "TEXT");
  addColumnIfMissing(
    targetAuthDb,
    "otp_challenges",
    "personal_email",
    "TEXT COLLATE NOCASE",
  );
  addColumnIfMissing(
    targetAuthDb,
    "otp_challenges",
    "email",
    "TEXT COLLATE NOCASE",
  );
  addColumnIfMissing(
    targetAuthDb,
    "otp_challenges",
    "age",
    "INTEGER NOT NULL DEFAULT 18",
  );
  addColumnIfMissing(
    targetAuthDb,
    "otp_challenges",
    "department",
    "TEXT NOT NULL DEFAULT 'General Medicine'",
  );

  targetAuthDb.exec(`
    CREATE INDEX IF NOT EXISTS idx_otp_email_created
      ON otp_challenges(personal_email, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_otp_phone_created
      ON otp_challenges(phone, created_at DESC);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_hospital_email
      ON users(hospital_email)
      WHERE hospital_email IS NOT NULL;
  `);

  targetClinicalDb.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY,
      full_name TEXT NOT NULL,
      age INTEGER NOT NULL CHECK (age BETWEEN 0 AND 120),
      gender TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      department TEXT NOT NULL,
      diagnosis TEXT,
      ward TEXT,
      doctor TEXT,
      prescription TEXT,
      status TEXT NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'admitted', 'discharged')),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admissions (
      id INTEGER PRIMARY KEY,
      patient_id INTEGER NOT NULL REFERENCES patients(id),
      full_name TEXT NOT NULL,
      phone TEXT,
      department TEXT NOT NULL,
      ward TEXT NOT NULL,
      doctor TEXT NOT NULL,
      room_type TEXT,
      bed TEXT,
      diet TEXT,
      stay_days INTEGER,
      payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'waived')),
      status TEXT NOT NULL DEFAULT 'admitted' CHECK (status IN ('admitted', 'discharged')),
      treatment_plan TEXT,
      medicines TEXT,
      injections TEXT,
      blood_tests TEXT,
      other_tests TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS patient_records (
      id INTEGER PRIMARY KEY,
      record_kind TEXT NOT NULL CHECK (record_kind IN ('registered', 'admitted')),
      full_name TEXT NOT NULL,
      age INTEGER NOT NULL CHECK (age BETWEEN 0 AND 120),
      gender TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      ward TEXT NOT NULL,
      doctor TEXT NOT NULL,
      diagnosis TEXT NOT NULL,
      admitted_at TEXT,
      discharged_at TEXT,
      operation_name TEXT,
      operation_date TEXT,
      status TEXT NOT NULL CHECK (status IN ('registered', 'admitted', 'discharged')),
      transaction_id TEXT NOT NULL,
      transaction_status TEXT NOT NULL CHECK (transaction_status IN ('paid', 'pending', 'waived')),
      amount_cents INTEGER NOT NULL CHECK (amount_cents >= 0),
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_patient_records_kind_status
      ON patient_records(record_kind, status);
    CREATE INDEX IF NOT EXISTS idx_patient_records_created
      ON patient_records(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_patients_created
      ON patients(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_admissions_created
      ON admissions(created_at DESC);

    CREATE TABLE IF NOT EXISTS medicines (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      generic_name TEXT NOT NULL,
      category TEXT NOT NULL,
      strength TEXT NOT NULL,
      price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
      stock_quantity INTEGER NOT NULL CHECK (stock_quantity >= 0),
      reorder_level INTEGER NOT NULL CHECK (reorder_level >= 0),
      prescription_required INTEGER NOT NULL DEFAULT 0 CHECK (prescription_required IN (0, 1)),
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS medicine_orders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('placed', 'cancelled', 'fulfilled')),
      payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded')),
      total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS medicine_order_items (
      id INTEGER PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES medicine_orders(id),
      medicine_id INTEGER NOT NULL REFERENCES medicines(id),
      name_snapshot TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 10),
      unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0)
    );

    CREATE INDEX IF NOT EXISTS idx_order_items_order ON medicine_order_items(order_id);
  `);

  // Ensure clinical database columns exist for existing tables
  addColumnIfMissing(targetClinicalDb, "admissions", "phone", "TEXT");
  addColumnIfMissing(targetClinicalDb, "admissions", "treatment_plan", "TEXT");
  addColumnIfMissing(targetClinicalDb, "admissions", "medicines", "TEXT");
  addColumnIfMissing(targetClinicalDb, "admissions", "injections", "TEXT");
  addColumnIfMissing(targetClinicalDb, "admissions", "blood_tests", "TEXT");
  addColumnIfMissing(targetClinicalDb, "admissions", "other_tests", "TEXT");
  addColumnIfMissing(targetClinicalDb, "patients", "prescription", "TEXT");
}

initializeDatabases();
