<script lang="ts">
  import "@fairaccess/theme";
  import favicon from "$lib/assets/favicon.svg";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";

  const { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="app-header">
  <LanguageSwitcher />
</header>

{@render children()}
<footer>Version: {data.version}</footer>

<style>
  .app-header {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--border-color, #eee);
  }

  footer {
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-muted, #666);
  }
</style>
