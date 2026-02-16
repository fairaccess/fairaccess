<script lang="ts">
  import { currentLocale, DEFAULT_LOCALE } from "@fairaccess/i18n";
  import Logo from "$lib/assets/logo.svg?component";

  let { width = "80px" } = $props();

  const locale = $derived($currentLocale);
  const homeHref = $derived(locale !== DEFAULT_LOCALE ? `/${locale}` : "/");
</script>

<style>
  a {
    display: block;
  }
</style>

<a href={homeHref}>
  <Logo {width} height="auto" />
</a>

