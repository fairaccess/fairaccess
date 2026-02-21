<script lang="ts">
  import { i18n } from "@fairaccess/i18n";

  let props: { version: string } = $props();

  const messages = i18n("footer", {
    version: "Version",
  });
</script>

<style>
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-primary-180);
    margin-block: 1rem;
    padding-inline: 1rem;
    border-radius: 900px;
    height: 3rem;
    container-type: size;
  }
</style>

<footer class="page-padding">
  <span>{$messages.version}: {props.version}</span>
</footer>
