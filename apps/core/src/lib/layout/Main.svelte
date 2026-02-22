<script lang="ts">
  let {children} = $props();
</script>

<style>
  main {
    padding: 1rem;
  }
</style>

<main class="page-margin">
  {@render children()}
</main>
