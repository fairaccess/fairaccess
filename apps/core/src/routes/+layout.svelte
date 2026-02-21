<script lang="ts">
  import "@fairaccess/theme/index.css";
  import "./+layout.css";
  import { DEFAULT_LOCALE, i18n, SUPPORTED_LOCALES } from "@fairaccess/i18n";
  import Header from "$lib/layout/Header.svelte";

  const { children, data } = $props();

  const messages = i18n("layout", {
    version: "Version",
    title: "FairAccess",
    pageTitle: "FairAccess - Your device. Your choice. Your terms.",
    description: "Our mission is to making Swiss services open and available under your rules and through the channels you choose, while protecting your security and privacy.",
    keywords: "swiss, services, open, available, rules, channels, security, privacy",
    author: "Robin Bühler",
  });

  function getHrefLang(locale: string, path: string): string {
    // Remove locale prefix from current path if it exists
    const localePattern = SUPPORTED_LOCALES.join("|");
    const pathWithoutLocale = path.replace(new RegExp(`^/(${localePattern})`), "") || "/";

    // For default locale, don't add prefix
    if (locale === DEFAULT_LOCALE) {
      return pathWithoutLocale;
    }

    return `/${locale}${pathWithoutLocale}`;
  }
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content={$messages.title} />
  <link rel="manifest" href="/site.webmanifest" />
  <title>{$messages.pageTitle}</title>
  <meta name="description" content={$messages.description} />
  <meta name="keywords" content={$messages.keywords} />
  <meta name="author" content={$messages.author} />
  {#each SUPPORTED_LOCALES as locale (locale)}
    <link rel="alternate" hreflang={locale} href={`https://fairaccess.ch${getHrefLang(locale, data.path)}`} />
  {/each}
  <link rel="alternate" hreflang="x-default" href="https://fairaccess.ch{data.path}" />
</svelte:head>

<Header />

<main>
  {@render children()}
</main>

<footer>Version: {data.version}</footer>

<style>
  main {
    flex-grow: 1;
  }
</style>
