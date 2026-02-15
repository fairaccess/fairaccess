export const DEFAULT_LOCALE = Bun.env.DEFAULT_LOCALE || "en-US";
export const SUPPORTED_LOCALES = ["en-US", "de-CH"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export { currentLocale, format, i18n } from "./store";
