<script lang="ts">
  const { children } = $props();

  import Brand from "$lib/components/Brand.svelte";
</script>

<header>
  <Brand />
  {@render children()}
</header>
