<script lang="ts">
  import { i18n } from "@fairaccess/i18n";
  import { Alert, Input } from "@fairaccess/theme";
  import { resolveWithCurrentLocale } from "$lib/routes-client";

  const messages = i18n("log-in", {
    title: "Log in",
    localProviderTitle: "Using a local account",
    externalProviderTitle: "Using an external identity provider",
    registerTitle: "Register a local account",
    description: "Log in to your account",
    loginFailedTitle: "Log in failed",
    registerButtonLabel: "Register",
    logInButtonLabel: "Log in",
  });

  let { form } = $props();
</script>

<h1>{$messages.title}</h1>
<p>{$messages.description}</p>

<section>
  <h2>{$messages.localProviderTitle}</h2>
  {#if form?.error}
    <Alert type="error" title={$messages.loginFailedTitle}>
      {form.error}
    </Alert>
  {/if}
  <form method="POST" action="?/signIn">
    <label>
      Email
      <Input type="email" name="email" autocomplete="email" required />
    </label>
    <label>
      Password
      <Input
        type="password"
        name="password"
        autocomplete="current-password"
        required
      />
    </label>
    <button type="submit">{$messages.logInButtonLabel}</button>
  </form>
</section>

<section>
  <h2>{$messages.externalProviderTitle}</h2>
</section>

<section>
  <h2>{$messages.registerTitle}</h2>
  <a href={resolveWithCurrentLocale("/register")} role="button">
    {$messages.registerButtonLabel}
  </a>
</section>

<style>
</style>
