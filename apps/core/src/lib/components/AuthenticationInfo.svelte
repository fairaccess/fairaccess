<script lang="ts">
  import { page } from "$app/state";
  import { resolveWithCurrentLocale } from "$lib/routes-client";
  import UserIcon from "~icons/tabler/user";

  const userName = $derived(page.data.session?.user?.name ?? "");
</script>

<a href={resolveWithCurrentLocale("/log-in")} role="button" class="rounded">
  <UserIcon />{userName}
</a>
