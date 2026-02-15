<script lang="ts">
  import { currentLocale } from "@fairaccess/i18n";
  import { untrack } from "svelte";

  let { children, data } = $props();

  // Set immediately for SSR/initial render (prevents flash)
  // untrack tells Svelte we intentionally only want the initial value here
  untrack(() => currentLocale.set(data.locale));

  // Also track changes for client-side navigation
  $effect.pre(() => {
    currentLocale.set(data.locale);
  });
</script>

{@render children()}
