import { Database } from "bun:sqlite";
import { readFileSync } from "fs";
import { resolve } from "path";

const dbPath = resolve(process.env.DATABASE_URL || "./app.db");
const db = new Database(dbPath);

// Read and execute migration
const migrationFile = resolve(
  import.meta.dir,
  "src/db/migrations/0000_steep_starfox.sql",
);
const migrationSQL = readFileSync(migrationFile, "utf-8");

// Split by statement-breakpoint and execute
const statements = migrationSQL
  .split("-->")
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith("statement-breakpoint"));

for (const statement of statements) {
  if (statement) {
    db.exec(statement);
  }
}

console.log("✓ Migrations completed successfully");
db.close();
