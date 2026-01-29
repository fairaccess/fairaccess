import { resolve } from "node:path";
import { defineConfig } from "drizzle-kit";

// Use a centralized database path at the workspace root
const defaultDbPath = resolve(import.meta.dirname, "../../data/fairaccess.db");

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || defaultDbPath,
  },
});
