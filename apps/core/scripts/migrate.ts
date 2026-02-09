import { resolve } from "node:path";
import { runAuthMigrations } from "@fairaccess/auth";
import { runMigrations } from "@fairaccess/db";

const databaseUrl = process.env.DATABASE_URL || undefined;
const migrationsPath =
  process.env.NODE_ENV === "production"
    ? resolve(process.cwd(), "./migrations")
    : undefined;

console.log("Running database migrations...");

runMigrations(databaseUrl, migrationsPath);
await runAuthMigrations({
  databaseUrl,
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});

console.log("Migrations complete.");
