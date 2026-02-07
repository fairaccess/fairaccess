import { Database } from "bun:sqlite";
import { resolve } from "node:path";
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
  const sqlite = new Database(dbPath);
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
