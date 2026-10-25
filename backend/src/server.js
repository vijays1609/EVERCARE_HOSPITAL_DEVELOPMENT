import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createApiServer } from "./app.js";
import { authDb, clinicalDb } from "./database.js";
import {
  hashPassword,
  isValidE164,
  normalizeEmail,
  validatePassword,
} from "./security.js";

async function bootstrapStaffAccount(env) {
  const credentials = [env.ADMIN_EMAIL, env.ADMIN_PASSWORD, env.ADMIN_PHONE];
  if (credentials.every((value) => !value)) return;
  if (credentials.some((value) => !value)) {
    throw new Error("Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_PHONE together, or leave all three empty.");
  }

  const email = normalizeEmail(env.ADMIN_EMAIL);
  const phone = env.ADMIN_PHONE.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }
  if (!isValidE164(phone)) {
    throw new Error("ADMIN_PHONE must use E.164 format, for example +14155552671.");
  }
  if (!validatePassword(env.ADMIN_PASSWORD)) {
    throw new Error("ADMIN_PASSWORD must be 12-128 characters and include uppercase, lowercase, number, and symbol characters.");
  }

  const existing = authDb
    .prepare("SELECT id, role FROM users WHERE email = ? COLLATE NOCASE OR phone = ? LIMIT 1")
    .get(email, phone);
  if (existing) {
    if (existing.role !== "staff") {
      throw new Error("The configured admin email or phone already belongs to a non-staff account.");
    }
    return;
  }

  authDb.prepare(`
    INSERT INTO users (id, full_name, email, phone, password_hash, role, is_active, is_seeded, created_at)
    VALUES (?, 'Evercare Staff Admin', ?, ?, ?, 'staff', 1, 0, ?)
  `).run(randomUUID(), email, phone, await hashPassword(env.ADMIN_PASSWORD), new Date().toISOString());
  console.log("Bootstrapped the configured staff admin account.");
}

export async function startServer(env = process.env) {
  await bootstrapStaffAccount(env);
  const server = createApiServer({ authDb, clinicalDb, env });
  const port = Number(env.PORT) || 3001;
  const host = env.HOST || "0.0.0.0";
  //const port = Number(env.PORT) || 3001;
  //const host = env.HOST || "127.0.0.1";
  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(port, host, () => {
      server.removeListener("error", rejectListen);
      resolveListen();
    });
  });
  console.log(`Evercare API listening at http://${host}:${server.address().port}`);

  const shutdown = () => {
    server.close(() => {
      authDb.close();
      clinicalDb.close();
      process.exit(0);
    });
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
  return server;
}

const invokedFile = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (invokedFile === import.meta.url) {
  startServer().catch((error) => {
    console.error(`Unable to start Evercare API: ${error.message}`);
    process.exitCode = 1;
    authDb.close();
    clinicalDb.close();
  });
}
