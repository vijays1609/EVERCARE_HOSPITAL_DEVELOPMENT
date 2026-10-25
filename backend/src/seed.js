import { authDb, clinicalDb, inTransaction } from "./database.js";

const PATIENT_COUNT = 4_800;
const MEDICINE_COUNT = 200;
const AUTH_USER_COUNT = 5_000;
const FIRST_NAMES = [
  "Aarav", "Aditi", "Ananya", "Arjun", "Dev", "Diya", "Ishaan", "Kavya",
  "Meera", "Neel", "Priya", "Rohan", "Sana", "Vihaan", "Zoya", "Kabir",
];
const LAST_NAMES = [
  "Desai", "Iyer", "Kapoor", "Kulkarni", "Mehta", "Nair", "Patel", "Rao",
  "Shah", "Singh", "Verma", "Joshi", "Khan", "Pillai", "Das", "Mishra",
];
const WARDS = [
  "Cardiology", "Neurology", "Orthopaedics", "Oncology", "Paediatrics",
  "Nephrology", "General Medicine", "Trauma Centre", "ICU", "Gastroenterology",
  "Obstetrics & Gynaecology", "Pulmonology", "Haematology", "Surgery",
];
const DOCTORS = [
  "Dr. Aarav Mehta", "Dr. Ananya Iyer", "Dr. Dev Patel", "Dr. Kavya Rao",
  "Dr. Meera Shah", "Dr. Neel Nair", "Dr. Priya Kulkarni", "Dr. Rohan Desai",
  "Dr. Sana Khan", "Dr. Vihaan Singh", "Dr. Zoya Verma", "Dr. Kabir Joshi",
];
const DIAGNOSES = [
  "Acute bronchitis", "Essential hypertension", "Type 2 diabetes mellitus",
  "Community-acquired pneumonia", "Cholelithiasis", "Osteoarthritis",
  "Iron deficiency anaemia", "Migraine without aura", "Dehydration",
  "Post-operative recovery", "Coronary artery disease", "Renal calculus",
  "Asthma exacerbation", "Gastro-oesophageal reflux", "Viral fever",
  "Fracture follow-up", "Hypothyroidism", "Elective procedure observation",
];
const OPERATIONS = [
  "Laparoscopic cholecystectomy", "Total knee arthroplasty", "Coronary angioplasty",
  "Cataract extraction", "Hernia repair", "Appendectomy", "Fracture fixation",
  "Caesarean section", "Endoscopic sinus surgery", "Renal stone lithotripsy",
];
const MEDICINE_NAMES = [
  ["Paracetamol", "Paracetamol", "Analgesic"],
  ["Amoxicillin", "Amoxicillin", "Antibiotic"],
  ["Amlodipine", "Amlodipine", "Cardiovascular"],
  ["Metformin", "Metformin", "Diabetes care"],
  ["Atorvastatin", "Atorvastatin", "Cardiovascular"],
  ["Omeprazole", "Omeprazole", "Gastrointestinal"],
  ["Cetirizine", "Cetirizine", "Allergy"],
  ["Ibuprofen", "Ibuprofen", "Analgesic"],
  ["ORS", "Oral rehydration salts", "Rehydration"],
  ["Salbutamol", "Salbutamol", "Respiratory"],
  ["Losartan", "Losartan", "Cardiovascular"],
  ["Levothyroxine", "Levothyroxine", "Endocrine"],
  ["Azithromycin", "Azithromycin", "Antibiotic"],
  ["Insulin", "Human insulin", "Diabetes care"],
  ["Diclofenac", "Diclofenac", "Analgesic"],
  ["Vitamin D3", "Cholecalciferol", "Supplement"],
  ["Iron tablets", "Ferrous sulphate", "Supplement"],
  ["Ondansetron", "Ondansetron", "Gastrointestinal"],
  ["Folic acid", "Folic acid", "Supplement"],
  ["Doxycycline", "Doxycycline", "Antibiotic"],
];
const STRENGTHS = ["5 mg", "10 mg", "20 mg", "250 mg", "500 mg", "650 mg", "1 g", "100 mg/ml", "2.5 mg/ml", "400 IU"];

function hash(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1_664_525 + 1_013_904_223) >>> 0;
    return value / 0x1_0000_0000;
  };
}

function pick(random, values) {
  return values[Math.floor(random() * values.length)];
}

function dateDaysBefore(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function seedAuthUsers() {
  const count = Number(authDb.prepare("SELECT COUNT(*) AS count FROM users").get().count);
  if (count !== 0) throw new Error(`Refusing to seed auth database with existing users (${count})`);

  const insert = authDb.prepare(`
    INSERT INTO users (id, full_name, email, phone, password_hash, role, is_active, is_seeded, created_at)
    VALUES (?, ?, ?, ?, NULL, 'patient', 0, 1, ?)
  `);
  const random = hash(0x45564352);
  inTransaction(authDb, () => {
    for (let index = 1; index <= AUTH_USER_COUNT; index += 1) {
      const fullName = `${pick(random, FIRST_NAMES)} ${pick(random, LAST_NAMES)}`;
      const sequence = String(index).padStart(5, "0");
      insert.run(
        `seed-user-${sequence}`,
        fullName,
        `seed-${sequence}@example.invalid`,
        `+1555${String(index).padStart(7, "0")}`,
        dateDaysBefore(Math.floor(random() * 1_400)),
      );
    }
  });
}

function seedClinicalData() {
  const patientCount = Number(clinicalDb.prepare("SELECT COUNT(*) AS count FROM patient_records").get().count);
  const medicineCount = Number(clinicalDb.prepare("SELECT COUNT(*) AS count FROM medicines").get().count);
  if (patientCount !== 0 || medicineCount !== 0) {
    throw new Error(`Refusing to seed clinical database with existing rows (patients=${patientCount}, medicines=${medicineCount})`);
  }

  const insertPatient = clinicalDb.prepare(`
    INSERT INTO patient_records (
      record_kind, full_name, age, gender, phone, email, ward, doctor, diagnosis,
      admitted_at, discharged_at, operation_name, operation_date, status,
      transaction_id, transaction_status, amount_cents, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertMedicine = clinicalDb.prepare(`
    INSERT INTO medicines (
      name, generic_name, category, strength, price_cents, stock_quantity,
      reorder_level, prescription_required, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const random = hash(0x484f5350);
  inTransaction(clinicalDb, () => {
    for (let index = 0; index < PATIENT_COUNT; index += 1) {
      const daysAgo = Math.floor(random() * 1_500);
      const createdAt = dateDaysBefore(daysAgo);
      const isRegistered = index % 8 === 0;
      const recordKind = isRegistered ? "registered" : "admitted";
      const wasDischarged = !isRegistered && random() < 0.72;
      const status = isRegistered ? "registered" : wasDischarged ? "discharged" : "admitted";
      const admittedAt = isRegistered ? null : createdAt;
      const dischargedAt = wasDischarged
        ? dateDaysBefore(Math.max(0, daysAgo - 1 - Math.floor(random() * 25)))
        : null;
      const hasOperation = !isRegistered && random() < 0.16;
      const operationName = hasOperation ? pick(random, OPERATIONS) : null;
      const operationDate = hasOperation ? dateDaysBefore(Math.max(0, daysAgo - Math.floor(random() * 20))) : null;
      const transactionStatus = pick(random, ["paid", "paid", "paid", "pending", "waived"]);
      const sequence = String(index + 1).padStart(6, "0");
      insertPatient.run(
        recordKind,
        `${pick(random, FIRST_NAMES)} ${pick(random, LAST_NAMES)}`,
        1 + Math.floor(random() * 99),
        pick(random, ["female", "male", "non-binary"]),
        `+1556${String(index + 1).padStart(7, "0")}`,
        `patient-${sequence}@example.invalid`,
        pick(random, WARDS),
        pick(random, DOCTORS),
        pick(random, DIAGNOSES),
        admittedAt,
        dischargedAt,
        operationName,
        operationDate,
        status,
        `DEMO-TXN-${sequence}`,
        transactionStatus,
        transactionStatus === "waived" ? 0 : 50_000 + Math.floor(random() * 1_950_001),
        createdAt,
      );
    }

    for (let index = 0; index < MEDICINE_COUNT; index += 1) {
      const [baseName, genericName, category] = MEDICINE_NAMES[index % MEDICINE_NAMES.length];
      const strength = STRENGTHS[Math.floor(index / MEDICINE_NAMES.length) % STRENGTHS.length];
      const variant = Math.floor(index / (MEDICINE_NAMES.length * STRENGTHS.length)) + 1;
      insertMedicine.run(
        variant === 1 ? `${baseName} ${strength}` : `${baseName} ${strength} - Pack ${variant}`,
        genericName,
        category,
        strength,
        300 + Math.floor(random() * 49_700),
        Math.floor(random() * 251),
        15 + Math.floor(random() * 36),
        random() < 0.62 ? 1 : 0,
        new Date().toISOString(),
      );
    }
  });
}

try {
  seedAuthUsers();
  seedClinicalData();
  const users = Number(authDb.prepare("SELECT COUNT(*) AS count FROM users").get().count);
  const encounters = Number(clinicalDb.prepare("SELECT COUNT(*) AS count FROM patient_records").get().count);
  const medicines = Number(clinicalDb.prepare("SELECT COUNT(*) AS count FROM medicines").get().count);
  console.log(`Seeded ${users} inactive demo users; ${encounters} patient encounters; ${medicines} medicine catalogue rows.`);
} finally {
  authDb.close();
  clinicalDb.close();
}
