import Database from "better-sqlite3";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.ts";

export function createDb(
  databaseUrl: string,
): BetterSQLite3Database<typeof schema> {
  const sqlite = new Database(databaseUrl);
  return drizzle(sqlite, { schema });
}

export type DB = ReturnType<typeof createDb>;
