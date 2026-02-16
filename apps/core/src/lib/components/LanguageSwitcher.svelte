<script lang="ts">
  import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from "@fairaccess/i18n";
  import { page } from "$app/state";

  const currentLocale = $derived(
    ((page.params as Record<string, string>).locale as Locale) || DEFAULT_LOCALE
  );

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
</script>

<nav class="language-switcher" aria-label="Language selection">
  {#each SUPPORTED_LOCALES as locale}
    <a
      href={getLocalePath(locale)}
      class:active={currentLocale === locale}
      aria-current={currentLocale === locale ? "page" : undefined}
    >
      {new Intl.DisplayNames([locale], { type: "language", languageDisplay: "standard", style: "narrow" }).of(locale)}
    </a>
  {/each}
</nav>

<style>
  .language-switcher {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .language-switcher a {
    padding: 0.25rem 0.5rem;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.875rem;
    color: var(--text-color, #333);
    background: var(--bg-secondary, #f0f0f0);
    transition: background-color 0.2s, color 0.2s;
  }

  .language-switcher a:hover {
    background: var(--bg-hover, #e0e0e0);
  }

  .language-switcher a.active {
    background: var(--primary-color, #007bff);
    color: var(--primary-text, #fff);
  }
</style>
