import Database from "better-sqlite3";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import { resolve } from "path";
import * as schema from "./schema.ts";

/**
 * Returns the default path to the shared database file.
 * The database is stored in the data directory at the workspace root.
 */
export function getDefaultDbPath(): string {
  return resolve(import.meta.dirname, "../../../data/fairaccess.db");
}

/**
 * Creates a database connection.
 * @param databaseUrl - Path to the SQLite database file. Defaults to the shared database location.
 */
export function createDb(
  databaseUrl?: string,
): BetterSQLite3Database<typeof schema> {
  const dbPath = databaseUrl || getDefaultDbPath();
  const sqlite = new Database(dbPath);
  return drizzle(sqlite, { schema });
}

export type DB = ReturnType<typeof createDb>;
