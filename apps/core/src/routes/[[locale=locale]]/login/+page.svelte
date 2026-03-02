<script lang="ts">
  import { i18n } from "@fairaccess/i18n";
  import { Input } from "@fairaccess/theme";

  const messages = i18n("login", {
    title: "Login",
    description: "Sign in to your account"
  });

  let { form } = $props();
</script>

<section>
  <h1>{$messages.title}</h1>
  <p>{$messages.description}</p>
</section>

<div class="container">
  <h1>Sign in</h1>
  <p class="subtitle">Use email and password to access the user demo.</p>

  {#if form?.error}
    <div class="error" role="alert">
      {form.error}
    </div>
  {/if}

  <div class="grid">
    <section class="card">
      <h2>Existing account</h2>
      <form method="POST" action="?/signIn">
        <label>
          Email
          <Input type="email" name="email" autocomplete="email" required />
        </label>
        <label>
          Password
          <Input type="password" name="password" autocomplete="current-password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </section>

    <section class="card">
      <h2>Create account</h2>
      <form method="POST" action="?/signUp">
        <label>
          Name
          <Input type="text" name="name" autocomplete="name" required />
        </label>
        <label>
          Email
          <Input type="email" name="email" autocomplete="email" required />
        </label>
        <label>
          Password
          <Input type="password" name="password" autocomplete="new-password" required />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </section>
  </div>
</div>
