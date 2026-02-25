<script lang="ts">
  import { page } from "$app/state";
  import UserIcon from "~icons/tabler/user";

  const userName = $derived(page.data.session?.user?.name ?? "");
  const usersHref = $derived(`${page.data.localePrefix ?? ""}/users`);
</script>

<a href="/login" role="button" class="rounded"><UserIcon />{userName}</a>
