<script lang="ts">
  import "@fairaccess/theme";
  import { currentLocale } from "@fairaccess/i18n";
  import favicon from "$lib/assets/favicon.svg";

  const { children, data } = $props();

  $effect(() => {
    currentLocale.set(data.locale || Bun.env.DEFAULT_LOCALE || "en-US");
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
Version: {data.version}
