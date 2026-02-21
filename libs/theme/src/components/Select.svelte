
<script lang="ts">
  import "./Select.css";
  import { Select, type WithoutChildren } from "bits-ui";
  import TablerPoint from '~icons/tabler/point';
  import TablerSelector from '~icons/tabler/selector';

  type Props = Omit<WithoutChildren<Select.RootProps>, "type" | "onValueChange"> & {
    placeholder?: string;
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
    type = "single",
    ...restProps
  }: Props = $props();

  const selectedLabel = $derived(
    items.find((item) => item.value === value)?.label
  );
</script>

<!--
TypeScript Discriminated Unions + destructing (required for "bindable") do not
get along, so we shut typescript up by casting `value` to `never`, however,
from the perspective of the consumer of this component, it will be typed appropriately.
-->
<Select.Root bind:value={value as never} {type} {...restProps}>
  <Select.Trigger>
    {selectedLabel ? selectedLabel : placeholder}
    <TablerSelector />
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

