<script lang="ts">
  import { i18n } from "@fairaccess/i18n";
  import { Accordion } from "@fairaccess/theme";
  import TablerAirBalloon from '~icons/tabler/air-balloon';

  const homeMessages = i18n("home", {
    title: "Welcome to SvelteKit",
  });
</script>

<h1>{$homeMessages.title}</h1>
<TablerAirBalloon />
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Item 1 Title</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content
      >This is the collapsible content for this section.</Accordion.Content
    >
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Header>
      <Accordion.Trigger>Item 2 Title</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content
      >This is the collapsible content for this section.</Accordion.Content
    >
  </Accordion.Item>
</Accordion.Root>
