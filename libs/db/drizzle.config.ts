import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

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
