import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { type DB, createDb } from "./db/client";
import { resolve } from "node:path";

/**
 * Run database migrations.
 * @param dbOrUrl - Either a database instance or path to the SQLite database.
 * @param migrationsPath - Path to the migrations folder. Defaults to the migrations in @fairaccess/db.
 */
export function runMigrations(
  dbOrUrl?: DB | string,
  migrationsPath?: string,
): void {
  const db =
    typeof dbOrUrl === "string" || dbOrUrl === undefined
      ? createDb(dbOrUrl)
      : dbOrUrl;

  // Default migrations folder path relative to this file
  const migrationsFolder =
    migrationsPath || resolve(import.meta.dirname, "./db/migrations");

  console.log(`Running migrations from ${migrationsFolder}...`);
  migrate(db, { migrationsFolder });
  console.log("✓ Migrations completed successfully");
}

// Allow running directly: bun run src/migrate.ts
if (import.meta.main) {
  runMigrations(process.env.DATABASE_URL || undefined);
}
