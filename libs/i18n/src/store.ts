import { createI18n, formatter } from "@nanostores/i18n";
import { atom } from "nanostores";
import deCH from "../../../assets/translations/de-CH.json";
import enUS from "../../../assets/translations/en-US.json";
import { DEFAULT_LOCALE } from ".";

export const currentLocale = atom<string>(DEFAULT_LOCALE);
export const format = formatter(currentLocale);
export const i18n = createI18n(currentLocale, {
  baseLocale: DEFAULT_LOCALE,
  cache: { "de-CH": deCH, "en-US": enUS },
  get: async () => ({}),
});
