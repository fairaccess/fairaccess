<script lang="ts">
  import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from "@fairaccess/i18n";
  import { Select } from "@fairaccess/theme";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  const currentLocale = $derived(
    ((page.params as Record<string, string>).locale as Locale) || DEFAULT_LOCALE
  );

  const localeItems = SUPPORTED_LOCALES.map((locale) => ({
    value: locale,
    label: new Intl.DisplayNames([locale], {
      type: "language",
      languageDisplay: "standard",
      style: "narrow",
    }).of(locale) || locale,
  }));

  function getLocalePath(locale: Locale): string {
    const pathname = page.url.pathname;
    const localeParam = (page.params as Record<string, string>).locale;
    const currentLocalePrefix = localeParam ? `/${localeParam}` : "";
    const pathWithoutLocale = currentLocalePrefix
      ? pathname.replace(currentLocalePrefix, "")
      : pathname;

    // For default locale, no prefix
    if (locale === DEFAULT_LOCALE) {
      return pathWithoutLocale || "/";
    }

    // For other locales, add prefix
    return `/${locale}${pathWithoutLocale || ""}`;
  }

  function handleLocaleChange(locale: string) {
    goto(getLocalePath(locale as Locale));
  }
</script>

<nav aria-label="Language selection">
  <Select
    items={localeItems}
    value={currentLocale}
    onValueChange={handleLocaleChange}
    placeholder="Select language"
  />
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
  }
</style>
