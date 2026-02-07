import { createAuth, sveltekitCookies } from "@fairaccess/auth";
import { getRequestEvent } from "$app/server";
import {
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  DATABASE_URL,
} from "$env/static/private";

export const auth = createAuth({
  databaseUrl: DATABASE_URL || undefined,
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  plugins: [sveltekitCookies(getRequestEvent)],
});
