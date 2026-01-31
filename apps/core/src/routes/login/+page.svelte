<script lang="ts">
  let { form } = $props();
</script>

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
          <input type="email" name="email" autocomplete="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" autocomplete="current-password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </section>

    <section class="card">
      <h2>Create account</h2>
      <form method="POST" action="?/signUp">
        <label>
          Name
          <input type="text" name="name" autocomplete="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autocomplete="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" autocomplete="new-password" required />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </section>
  </div>
</div>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1.5rem;
  }

  form {
    display: grid;
    gap: 1rem;
  }

  label {
    display: grid;
    gap: 0.4rem;
    font-weight: 600;
  }

  input {
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem 1.2rem;
    border: none;
    border-radius: 6px;
    background: #007bff;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }

  .error {
    background: #ffe7e7;
    color: #a40000;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    border: 1px solid #ffcccc;
    margin-bottom: 1.5rem;
  }
</style>
