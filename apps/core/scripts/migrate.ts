import { resolve } from "node:path";
import { runMigrations } from "@fairaccess/db";

// In production (Docker), migrations are at ./migrations
// In development, pass undefined to use the default path from @fairaccess/db
const migrationsPath =
  process.env.NODE_ENV === "production"
    ? resolve(process.cwd(), "./migrations")
    : undefined;

runMigrations(process.env.DATABASE_URL || undefined, migrationsPath);
