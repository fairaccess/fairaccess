import { resolve } from "node:path";
import { runAuthMigrations } from "@fairaccess/auth";
import { runMigrations } from "@fairaccess/db";

// In production (Docker), migrations are at ./migrations
// In development, pass undefined to use the default path from @fairaccess/db
const migrationsPath =
  process.env.NODE_ENV === "production"
    ? resolve(process.cwd(), "./migrations")
    : undefined;

runMigrations(process.env.DATABASE_URL || undefined, migrationsPath);
await runAuthMigrations({
  databaseUrl: process.env.DATABASE_URL || undefined,
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
