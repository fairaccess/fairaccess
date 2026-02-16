<script lang="ts">
  import { currentLocale, DEFAULT_LOCALE } from "@fairaccess/i18n";
  import Logo from "$lib/assets/logo.svg?component";

  let { id = undefined } = $props();

  const locale = $derived($currentLocale);
  const homeHref = $derived(locale !== DEFAULT_LOCALE ? `/${locale}` : "/");
</script>

<style>
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 100%;
    font-size: 61.8cqh;
    line-height: 1;

    :global(svg) {
      min-height: 100%;
      flex-shrink: 0;
    }
  }
</style>

<a href={homeHref} {id}>
  <Logo width="auto" height="100%" />
  FairAccess
</a>

