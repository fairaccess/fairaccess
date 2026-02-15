<script lang="ts">
  import { currentLocale } from "@fairaccess/i18n";

  const { children, data } = $props();

  $effect(() => {
    currentLocale.set(data.locale);
  });
</script>

{@render children()}
