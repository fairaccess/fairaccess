<script lang="ts">
  const { children } = $props();

  import Brand from "$lib/components/Brand.svelte";
</script>

<style>
  header {
    background-color: var(--color-primary-180);
  }
</style>

<header>
  <Brand width="80px" />
  {@render children()}
</header>
