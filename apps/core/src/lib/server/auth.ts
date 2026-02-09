import { createAuth, sveltekitCookies } from "@fairaccess/auth";
import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";

export const auth = createAuth({
  databaseUrl: env.DATABASE_URL || undefined,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  plugins: [sveltekitCookies(getRequestEvent)],
});
