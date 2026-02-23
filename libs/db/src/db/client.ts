import { Database } from "bun:sqlite";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema.ts";

/**
 * Returns the default path to the shared database file.
 * The database is stored in the data directory at the workspace root.
 */
export function getDefaultDbPath(): string {
  return resolve(import.meta.dirname, "../../../data/fairaccess.db");
}

/**
 * Creates a raw SQLite connection with standard pragmas.
 * @param databaseUrl - Path to the SQLite database file. Defaults to the shared database location.
 */
export function createSqliteConnection(databaseUrl?: string): Database {
  const dbPath = databaseUrl || getDefaultDbPath();

  // Check if database file exists
  const dbExists = existsSync(dbPath);

  // Ensure the directory exists
  const dbDir = dirname(dbPath);
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
    console.log(`📁 Created database directory: ${dbDir}`);
  }

  // Create or open the database
  const sqlite = new Database(dbPath);

  // Print message based on whether DB was created or opened
  if (!dbExists) {
    console.log(`✨ Created new database: ${dbPath}`);
  } else {
    console.log(`📂 Opened existing database: ${dbPath}`);
  }

  sqlite.run("PRAGMA journal_mode = WAL");
  sqlite.run("PRAGMA synchronous = NORMAL");
  sqlite.run("PRAGMA busy_timeout = 5000");
  return sqlite;
}

/**
 * Creates a database connection.
 * @param databaseUrl - Path to the SQLite database file. Defaults to the shared database location.
 */
export function createDb(databaseUrl?: string): DB {
  const sqlite = createSqliteConnection(databaseUrl);
  return drizzle(sqlite, { schema });
}

export type DB = ReturnType<typeof drizzle>;
