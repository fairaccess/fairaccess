<script lang="ts">
  import { page } from "$app/state";
  import { resolveWithCurrentLocale } from "$lib/routes-client";
  import UserIcon from "~icons/tabler/user";

  const session = $derived(page.data.session);
  const userName = $derived(session?.user?.name ?? "");
</script>

{#if session}
  <form method="POST" action="{resolveWithCurrentLocale('/log-out')}?/signOut">
    <button type="submit" class="rounded">
      <UserIcon />{userName}
    </button>
  </form>
{:else}
  <a href={resolveWithCurrentLocale("/log-in")} role="button" class="rounded">
    <UserIcon /><span>Log in</span>
  </a>
{/if}
