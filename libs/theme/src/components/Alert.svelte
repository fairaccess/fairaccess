<script lang="ts">
  import type { Snippet } from "svelte";
  import ErrorIcon from "~icons/tabler/alert-hexagon";
  import WarningIcon from "~icons/tabler/alert-triangle";
  import InfoIcon from "~icons/tabler/info-circle";
  import SuccessIcon from "~icons/tabler/square-check";

  type Props = {
    title: string;
    type?: "success" | "error" | "warning" | "info";
    children: Snippet;
  };

  let { title, type = "info", children }: Props = $props();
</script>

<div data-alert data-alert-type={type} role="alert">
  <div data-alert-icon>
    {#if type === "error"}
      <ErrorIcon />
    {:else if type === "warning"}
      <WarningIcon />
    {:else if type === "success"}
      <SuccessIcon />
    {:else}
      <InfoIcon />
    {/if}
  </div>
  <div data-alert-title>{title}</div>
  <div data-alert-content>
    {@render children()}
  </div>
</div>

<style>
  [data-alert-type="error"] {
    --alert-color: var(--color-red-600);
  }
  [data-alert-type="warning"] {
    --alert-color: var(--color-yellow-600);
  }
  [data-alert-type="success"] {
    --alert-color: var(--color-green-600);
  }
  [data-alert-type="info"] {
    --alert-color: var(--color-blue-600);
  }
</style>
