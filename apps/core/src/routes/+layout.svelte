<script lang="ts">
  import "@fairaccess/theme";
  import favicon from "$lib/assets/favicon.svg";

  const { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
Version: {data.version}
