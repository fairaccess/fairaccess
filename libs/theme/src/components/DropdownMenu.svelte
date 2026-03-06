<script lang="ts">
  import { DropdownMenu, type WithoutChild } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = DropdownMenu.RootProps & {
    triggerText: string;
    trigger?: Snippet;
    children: Snippet;
    contentProps?: WithoutChild<DropdownMenu.ContentProps>;
  };

  let {
    open = $bindable(false),
    children,
    trigger,
    triggerText,
    contentProps,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger class="rounded">
    {#if trigger}
      {@render trigger()}
    {:else}
      {triggerText}
    {/if}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content {...contentProps}>
      {@render children()}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
