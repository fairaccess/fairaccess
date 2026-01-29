<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "../crud/$types";

  interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  }

  let { data }: { data: PageData } = $props();

  let name = $state("");
  let email = $state("");
  let editingId: number | null = $state(null);

  function startEdit(user: User) {
    name = user.name;
    email = user.email;
    editingId = user.id;
  }

  function cancelEdit() {
    name = "";
    email = "";
    editingId = null;
  }
</script>

<div class="container">
  <h1>User Management CRUD Demo</h1>

  <div class="form-section">
    <h2>{editingId ? "Edit User" : "Add New User"}</h2>
    <form
      method="POST"
      action={editingId ? "?/update" : "?/create"}
      use:enhance={() => {
        return async ({ result }) => {
          if (result.type === "success") {
            name = "";
            email = "";
            editingId = null;
          }
        };
      }}
    >
      {#if editingId}
        <input type="hidden" name="id" value={editingId} />
      {/if}

      <div class="form-group">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          bind:value={name}
          placeholder="Enter name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          bind:value={email}
          placeholder="Enter email"
          required
        />
      </div>

      <div class="button-group">
        <button type="submit">
          {editingId ? "Update User" : "Add User"}
        </button>
        {#if editingId}
          <button type="button" onclick={cancelEdit}>
            Cancel
          </button>
        {/if}
      </div>
    </form>
  </div>

  <div class="list-section">
    <h2>Users ({data.users.length})</h2>
    {#if data.users.length === 0}
      <p>No users yet. Create one to get started!</p>
    {:else}
      <div class="user-list">
        {#each data.users as user (user.id)}
          <div class="user-card">
            <div class="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <small>{new Date(user.createdAt).toLocaleDateString()}</small>
            </div>
            <div class="user-actions">
              <button onclick={() => startEdit(user)}>
                Edit
              </button>
              <form method="POST" action="?/delete" use:enhance style="display: inline;">
                <input type="hidden" name="id" value={user.id} />
                <button type="submit" class="delete-btn">
                  Delete
                </button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
  }

  h2 {
    color: #555;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .form-section {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid #eee;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #555;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  .delete-btn {
    background-color: #dc3545;
  }

  .delete-btn:hover {
    background-color: #c82333;
  }

  .list-section {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #eee;
  }

  .user-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .user-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: box-shadow 0.3s;
  }

  .user-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .user-info h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .user-info p {
    margin: 0 0 0.5rem 0;
    color: #666;
  }

  .user-info small {
    color: #999;
  }

  .user-actions {
    display: flex;
    gap: 0.5rem;
  }

  .user-actions button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    .user-card {
      flex-direction: column;
      align-items: flex-start;
    }

    .user-actions {
      width: 100%;
      margin-top: 1rem;
    }

    .user-actions button {
      flex: 1;
    }
  }
</style>
