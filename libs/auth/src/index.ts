import { createSqliteConnection, getDefaultDbPath } from "@fairaccess/db";
import {
  type BetterAuthOptions,
  type BetterAuthPlugin,
  betterAuth,
} from "better-auth";
import { getMigrations } from "better-auth/db";

export type AuthConfig = {
  databaseUrl?: string;
  baseURL?: string;
  secret?: string;
  plugins?: BetterAuthPlugin[];
};

function buildAuthOptions(config: AuthConfig) {
  const dbPath = config.databaseUrl || getDefaultDbPath();
  const sqlite = createSqliteConnection(dbPath);
  const options: BetterAuthOptions = {
    baseURL: config.baseURL,
    secret: config.secret,
    database: sqlite,
    emailAndPassword: {
      enabled: true,
    },
    plugins: config.plugins ?? [],
  };

  return { options, sqlite };
}

export function createAuth(config: AuthConfig = {}) {
  const { options } = buildAuthOptions(config);
  return betterAuth(options);
}

export async function runAuthMigrations(config: AuthConfig = {}) {
  const { options, sqlite } = buildAuthOptions(config);
  try {
    const { runMigrations } = await getMigrations(options);
    await runMigrations();
  } finally {
    sqlite.close();
  }
}

export { svelteKitHandler, sveltekitCookies } from "better-auth/svelte-kit";
