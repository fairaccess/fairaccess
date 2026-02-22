<script lang="ts">
  import Brand from "$lib/components/Brand.svelte";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    background-color: var(--color-primary-180);
    margin-block: 1rem;
    padding: 0.5rem;
    padding-inline-end: 1rem;
    border-radius: 900px;
    height: 3rem;
    container-type: size;
  }
</style>

<header class="page-margin">
  <Brand id="title" />
  <LanguageSwitcher />
</header>
