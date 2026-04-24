import { createI18n, formatter, type Messages } from "@nanostores/i18n";
import { atom } from "nanostores";
import deCH from "../../../assets/translations/de-CH.json";
import enUS from "../../../assets/translations/en-US.json";
import frCH from "../../../assets/translations/fr-CH.json";
import itCH from "../../../assets/translations/it-CH.json";
import { DEFAULT_LOCALE } from "./constants";

type LocaleMessages = Record<string, Record<string, string>>;

const messagesByLocale: Record<string, LocaleMessages> = {
  "de-CH": deCH,
  "en-CH": enUS,
  "fr-CH": frCH,
  "it-CH": itCH,
};

export const currentLocale = atom<string>(DEFAULT_LOCALE);
export const format = formatter(currentLocale);
export const i18n = createI18n(currentLocale, {
  baseLocale: DEFAULT_LOCALE,
  cache: { "de-CH": deCH, "en-CH": enUS, "fr-CH": frCH, "it-CH": itCH },
  get: async (locale, components) => {
    const localeMessages = messagesByLocale[locale];

    if (!localeMessages) {
      return {};
    }

    return Object.fromEntries(
      components
        .map((component) => [component, localeMessages[component]] as const)
        .filter(([, value]) => value !== undefined),
    );
  },
  isSSR: true,
});

const messageStores = new Map<string, ReturnType<typeof i18n>>();

export function defineMessages<T extends Parameters<typeof i18n>[1]>(
  componentName: string,
  base: T,
): Messages<T> {
  const cached = messageStores.get(componentName);

  if (cached) {
    return cached as Messages<T>;
  }

  const store = i18n(componentName, base);
  messageStores.set(componentName, store);
  return store;
}
