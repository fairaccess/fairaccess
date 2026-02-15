import { DEFAULT_LOCALE } from "@fairaccess/i18n";
import pkg from "../../package.json";

const AVAILABLE_LOCALES = ["en-US", "de-CH"] as const;

function pickLocale(acceptLanguage: string | null) {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const requested = acceptLanguage
    .split(",")
    .map((value) => value.split(";")[0]?.trim())
    .filter(Boolean);

  for (const locale of requested) {
    const exact = AVAILABLE_LOCALES.find(
      (available) => available.toLowerCase() === locale.toLowerCase(),
    );
    if (exact) return exact;

    const prefix = locale.toLowerCase().split("-")[0];
    const partial = AVAILABLE_LOCALES.find((available) =>
      available.toLowerCase().startsWith(`${prefix}-`),
    );
    if (partial) return partial;
  }

  return DEFAULT_LOCALE;
}

export function load({ request }) {
  const locale = pickLocale(request.headers.get("accept-language"));

  return {
    version: pkg.version,
    locale,
  };
}
