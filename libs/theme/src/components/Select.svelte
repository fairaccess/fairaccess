
<script lang="ts">
  import "./Select.css";
  import { Select, type WithoutChildren } from "bits-ui";
  import type { Component } from "svelte";
  import TablerSelector from '~icons/tabler/selector';

  type Props = Omit<WithoutChildren<Select.RootProps>, "type" | "onValueChange"> & {
    placeholder?: string;
    Trigger?: Component;
    items: { value: string; label: string; disabled?: boolean }[];
    contentProps?: WithoutChildren<Select.ContentProps>;
    type?: "single";
    onValueChange?: (value: string) => void;
  };

  let {
    value = $bindable(),
    items,
    contentProps,
    placeholder,
    Trigger,
    type = "single",
    ...restProps
  }: Props = $props();

  const selectedLabel = $derived(
    items.find((item) => item.value === value)?.label
  );

  const triggerClass = $derived(
    Trigger ? "rounded" : ""
  );
</script>

<Select.Root bind:value={value as never} {type} {...restProps}>
  <Select.Trigger class={triggerClass}>
    {#if Trigger}
      <Trigger />
    {:else}
      {selectedLabel ? selectedLabel : placeholder}
      <TablerSelector />
    {/if}
  </Select.Trigger>
  <Select.Portal>
    <Select.Content {...contentProps}>
      <Select.ScrollUpButton>up</Select.ScrollUpButton>
      <Select.Viewport>
        {#each items as { value, label, disabled } (value)}
          <Select.Item {value} {label} {disabled}>
            {label}
          </Select.Item>
        {/each}
      </Select.Viewport>
      <Select.ScrollDownButton>down</Select.ScrollDownButton>
    </Select.Content>
  </Select.Portal>
</Select.Root>

