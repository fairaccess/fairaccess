
<script lang="ts">
  import { DropdownMenu, type WithoutChild } from "bits-ui";
  import type { Component } from "svelte";

  type Props = DropdownMenu.RootProps & {
    triggerText: string;
    Trigger?: Component;
    items: string[];
    contentProps?: WithoutChild<DropdownMenu.ContentProps>;
  };

  let {
    open = $bindable(false),
    children,
    Trigger,
    triggerText,
    items,
    contentProps,
    ...restProps
  }: Props = $props();
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger>
    {#if Trigger}
      <Trigger />
    {:else}
      {triggerText}
    {/if}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content {...contentProps}>
      <DropdownMenu.Group aria-label={triggerText}>
        {#each items as item}
          <DropdownMenu.Item textValue={item}>
            {item}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

