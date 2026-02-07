import { svelteKitHandler } from "@fairaccess/auth";
import { type Handle, redirect } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  event.locals.session = null;

  if (pathname.startsWith("/users") || pathname === "/login") {
    const session = await auth.api.getSession({
      headers: event.request.headers,
    });
    event.locals.session = session;

    if (pathname.startsWith("/users") && !session) {
      throw redirect(303, "/login");
    }

    if (pathname === "/login" && session) {
      throw redirect(303, "/users");
    }
  }

  return svelteKitHandler({ auth, event, resolve, building });
};
