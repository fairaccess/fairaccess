import { svelteKitHandler } from "@fairaccess/auth";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@fairaccess/i18n";
import { type Handle, redirect } from "@sveltejs/kit";
import { building } from "$app/environment";
import { auth } from "$lib/server/auth";

// Helper to strip locale prefix from pathname
function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length > 0 &&
    SUPPORTED_LOCALES.includes(
      segments[0] as (typeof SUPPORTED_LOCALES)[number],
    )
  ) {
    return `/${segments.slice(1).join("/")}` || "/";
  }
  return pathname;
}

// Helper to get locale from pathname
function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length > 0 &&
    SUPPORTED_LOCALES.includes(
      segments[0] as (typeof SUPPORTED_LOCALES)[number],
    )
  ) {
    return segments[0];
  }
  return DEFAULT_LOCALE;
}

export const handle: Handle = async ({ event, resolve }) => {
  const pathname = event.url.pathname;
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const locale = getLocaleFromPath(pathname);
  const localePrefix = locale !== DEFAULT_LOCALE ? `/${locale}` : "";
  event.locals.session = null;

  if (
    pathWithoutLocale.startsWith("/users") ||
    pathWithoutLocale === "/login"
  ) {
    const session = await auth.api.getSession({
      headers: event.request.headers,
    });
    event.locals.session = session;

    if (pathWithoutLocale.startsWith("/users") && !session) {
      throw redirect(303, `${localePrefix}/login`);
    }

    if (pathWithoutLocale === "/login" && session) {
      throw redirect(303, `${localePrefix}/users`);
    }
  }

  // Wrap resolve to add html_attributes with the correct lang
  const resolveWithLang: typeof resolve = (event, opts) => {
    return resolve(event, {
      ...opts,
      transformPageChunk: ({ html }) =>
        html.replace("%sveltekit.html_attributes%", `lang="${locale}"`),
    });
  };

  return svelteKitHandler({ auth, event, resolve: resolveWithLang, building });
};
