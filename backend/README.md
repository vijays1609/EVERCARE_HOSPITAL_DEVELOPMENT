# Evercare Hospital API

Node.js REST API used by the static frontend for account registration, phone verification, sign-in, inventory, and staff record access.

## Requirements

- Node.js 22.13 or newer (uses the built-in `node:sqlite` module)
- A Twilio account and an approved sender for live SMS verification

## Run locally

1. Copy `.env.example` to `.env`.
2. Set a random `JWT_SECRET` of at least 32 characters. For example, generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
3. Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_FROM_NUMBER` to enable SMS delivery. OTPs are never returned by the API or printed to the console. Without Twilio configuration, health, inventory, and staff endpoints still run; OTP requests return HTTP 503.
4. Optionally set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_PHONE` (E.164 format) to bootstrap the first staff account.
5. Run `npm run seed` to create the local databases and synthetic demo data, then `npm start`.

Open the frontend through VS Code Live Server at `http://127.0.0.1:5500` (or `http://localhost:5500`) so the API's default CORS allowlist accepts it. Opening `index.html` directly as a `file://` URL is not supported for API calls. Keep the backend listening on its default port 3001 unless the frontend API URL and CORS settings are configured to match.

The API listens on `http://localhost:3001` by default. SQLite files are created in `backend/data/` and ignored by Git. `npm run seed` creates exactly 4,800 synthetic patient encounters and 200 synthetic medicine items (5,000 rows total); it will not overwrite a non-empty dataset.

## Endpoints

- `GET /health`
- `POST /api/auth/register/request-otp` with `{ "name", "email", "phone", "age", "department", "password" }`; phone must use E.164 format.
- `POST /api/auth/register/resend-otp` with `{ "phone", "challengeId" }`.
- `POST /api/auth/register/verify-otp` with `{ "phone", "challengeId", "code" }`; returns a bearer session only after verification.
- `POST /api/auth/login` with `{ "email", "password" }`.
- `GET /api/inventory`.
- `POST /api/orders` with `{ "items": [{ "medicineId", "quantity" }] }`; requires a bearer token, and atomically rejects orders over 10 units or beyond available stock.
- `GET /api/staff/patient-records?kind=registered|admitted` (staff bearer token required).

Passwords use scrypt with a unique salt; OTPs are stored as keyed hashes, expire, and are attempt-limited. API responses do not contain an OTP. Registration requires a configured SMS provider. The in-memory request limiter is intended for local development; production deployment should use a shared rate limiter, HTTPS, managed secrets, backups, and provider-specific SMS compliance.

## Tests

Run `npm test` from this directory.
