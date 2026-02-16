import { createI18n, formatter } from "@nanostores/i18n";
import { atom } from "nanostores";
import deCH from "../../../assets/translations/de-CH.json";
import enUS from "../../../assets/translations/en-US.json";
import frCH from "../../../assets/translations/fr-CH.json";
import itCH from "../../../assets/translations/it-CH.json";
import { DEFAULT_LOCALE } from "./constants";

export const currentLocale = atom<string>(DEFAULT_LOCALE);
export const format = formatter(currentLocale);
export const i18n = createI18n(currentLocale, {
  baseLocale: DEFAULT_LOCALE,
  cache: { "de-CH": deCH, "en-CH": enUS, "fr-CH": frCH, "it-CH": itCH },
  get: async () => ({}),
  isSSR: true,
});
