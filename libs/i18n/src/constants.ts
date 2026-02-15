// Using a hardcoded default since Bun.env may not be available during SSR build
// The actual locale detection happens at runtime in the hooks
export const DEFAULT_LOCALE = "en-US";
export const SUPPORTED_LOCALES = ["en-US", "de-CH"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
