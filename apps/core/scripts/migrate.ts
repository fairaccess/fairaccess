import { resolve } from "node:path";
import { runAuthMigrations } from "@fairaccess/auth";
import { runMigrations } from "@fairaccess/db";

const databaseUrl = Bun.env.DATABASE_URL || undefined;
const migrationsPath =
  Bun.env.NODE_ENV === "production"
    ? resolve(process.cwd(), "./migrations")
    : undefined;

console.log("Running database migrations...");

runMigrations(databaseUrl, migrationsPath);
await runAuthMigrations({
  databaseUrl,
  baseURL: Bun.env.BETTER_AUTH_URL,
  secret: Bun.env.BETTER_AUTH_SECRET,
});

console.log("Migrations complete.");
