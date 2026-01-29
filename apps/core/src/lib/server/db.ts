import { createDb } from "@fairaccess/db";
import { DATABASE_URL } from "$env/static/private";

export const db = createDb(DATABASE_URL || "./app.db");
