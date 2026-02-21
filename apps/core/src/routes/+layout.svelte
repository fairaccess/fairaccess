<script lang="ts">
  import "@fairaccess/theme/index.css";
  import "./+layout.css";
  import Header from "$lib/layout/Header.svelte";

  const { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="FairAccess" />
  <link rel="manifest" href="/site.webmanifest" />
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
