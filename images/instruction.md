# Objective: Hospital Staff Portal Authentication Refactor & Patient Management Pipeline

Refactor the existing backend and frontend to replace Twilio SMS with an email-based OTP verification workflow for hospital staff onboarding. Implement hospital-specific email handle generation, hashed admin passkey verification for login, and end-to-end SQLite clinical data persistence.

---

### 1. Verification Service & Employee Onboarding Flow (Email OTP)
* **Remove Twilio SMS Dependency**:
  - Replace Twilio client calls in `backend/src/sms.js` (or refactor to `backend/src/mail.js`) using `nodemailer`.
  - Configure the mailer service using environment variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`).
  - Provide a console fallback in development: if credentials are not configured, log the 6-digit verification code directly to the backend terminal.
* **Employee Registration UI**:
  - Update the registration interface to reflect **Hospital Employee Enrollment** (not patient self-registration).
  - Collect fields: keep it same as now
  - Place a **"Send OTP"** button directly adjacent to the personal email input field.
  - Implement a dedicated 6-digit OTP input box with a **"Verify Code"** button.
  - **Sequential Access Control**: Lock or hide the "Password" and "Confirm Password" creation fields until the backend confirms OTP validation.
* **OTP Lifecycle & Backend Endpoints**:
  - `POST /api/auth/send-otp`: Accept personal email, generate a cryptographically secure 6-digit numerical code, set a 5-minute TTL, and send via `nodemailer`.
  - `POST /api/auth/verify-otp`: Validate submitted OTP against the cached/hashed token. Return a transient verification token or state flag upon success.

---

### 2. Hospital Email Generation & Credential Storage
* **Institutional Handle Generation**:
  - When the employee sets their password and finalizes registration (`POST /api/auth/register`), automatically construct an institutional hospital email address.
  - Schema: Lowercase first name + 3-digit pseudo-random salt + domain suffix (e.g., `gaurav` + `120` -> `gaurav120@evercare.com`).
  - Verify uniqueness against the database; auto-increment or regenerate the numeric suffix if collisions occur.
* **Database Updates (`data/auth.sqlite`)**:
  - Update the `users` table schema:
    - `id` (INTEGER PRIMARY KEY)
    - `first_name` (TEXT)
    - `last_name` (TEXT)
    - `personal_email` (TEXT)
    - `hospital_email` (TEXT UNIQUE NOT NULL)
    - `password_hash` (TEXT NOT NULL)
    - `department` (TEXT)
    - `created_at` (DATETIME)
  - Hash passwords via `security.js` using `bcrypt` (salt rounds: 10 or 12).
* **Registration Success View**:
  - Upon successful registration, display a confirmation modal/view clearly highlighting the newly assigned institutional identity:
    > "Registration Successful! Your official hospital login handle is: **<generated_email>@evercare.com**."
  - Instruct the employee that all system access requires this `@evercare.com` identifier.

---

### 3. Login Authentication & Hashed Admin Security Code
* **Login Form Fields**:
  - Official Hospital Email (`@evercare.com` format only; reject personal emails).
  - Account Password.
  - **Admin Security Passcode** input field.
* **Hashed Admin Passcode Validation**:
  - Required passcode value: `01605`.
  - **Security Constraint**: Do NOT store this passcode in plain text anywhere in source files.
  - Store a one-way cryptographic hash of the passcode (e.g., bcrypt hash: `$2b$10$...` or SHA-256 equivalent) inside `.env` as `ADMIN_ACCESS_CODE_HASH`.
  - During authentication (`POST /api/auth/login`), check the submitted passcode against `ADMIN_ACCESS_CODE_HASH` using `bcrypt.compare()` alongside hospital email and password verification.
* **Rejection Criteria**:
  - Return HTTP 401/403 if the institutional email is not found, password does not match, or the admin passcode hash fails verification.

---

### 4. Clinical Persistence & Departmental Patient Lists (`data/clinical.sqlite`)
* **Database Schema Update**:
  - Ensure `clinical.sqlite` contains separate, relational schemas for:
    - **Registered Patients**: `patients`- (here keep all the details we are collecting from the patient while registering him).
    - **Admitted Patients**: `admissions` (here keep all the details we are collecting from the patient while admitting him.)
* **Clinical Management UI & Synchronous Updates**:
  - Build/refactor the dashboard visible to authenticated employees:
    1. **Register Patient Form**: Form submissions persist patient records directly to `clinical.sqlite` and dynamically re-render the **Registered Patients List**.
    2. **Patient Admission Flow**: Link a registered patient to an active ward/bed allotment partitioned by department (e.g., Cardiology, Neurology, Emergency, Pediatrics).
  - Wire all UI action triggers to REST API endpoints (`GET /api/patients`, `POST /api/patients`, `GET /api/admissions`, `POST /api/admissions`) with immediate DOM re-rendering.