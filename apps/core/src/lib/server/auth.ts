import { AsyncLocalStorage } from "node:async_hooks";
import { createAuth, sveltekitCookies } from "@fairaccess/auth";
import type { RequestEvent } from "@sveltejs/kit";
import {
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  DATABASE_URL,
} from "$env/static/private";

const requestEventStore = new AsyncLocalStorage<RequestEvent>();

const getRequestEvent = (): RequestEvent => {
  const event = requestEventStore.getStore();
  if (!event) {
    throw new Error("RequestEvent not available outside of request handler");
  }
  return event;
};

export const auth = createAuth({
  databaseUrl: DATABASE_URL || undefined,
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
  plugins: [sveltekitCookies(getRequestEvent)],
});

export function withAuthRequestEvent<T>(
  event: RequestEvent,
  fn: () => Promise<T>,
) {
  return requestEventStore.run(event, fn);
}
