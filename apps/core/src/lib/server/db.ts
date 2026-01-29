import { createDb } from "@fairaccess/db";
import { DATABASE_URL } from "$env/static/private";

// Uses the centralized shared database from libs/db
// DATABASE_URL can override the default path if needed
export const db = createDb(DATABASE_URL || undefined);
