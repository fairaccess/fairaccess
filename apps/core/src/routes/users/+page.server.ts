import { type Actions, fail } from "@sveltejs/kit";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "$lib/server/users";

export async function load() {
  return {
    users: await getUsers(),
  };
}

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();

    if (!name || !email) {
      return fail(400, { error: "Name and email are required" });
    }

    try {
      const user = await createUser(name, email);
      return { success: true, user };
    } catch (error) {
      return fail(500, {
        error: error instanceof Error ? error.message : "Failed to create user",
      });
    }
  },

  update: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get("id")?.toString() || "0", 10);
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();

    if (!id) {
      return fail(400, { error: "ID is required" });
    }

    try {
      const user = await updateUser(id, { name, email });
      return { success: true, user };
    } catch (error) {
      return fail(500, {
        error: error instanceof Error ? error.message : "Failed to update user",
      });
    }
  },

  delete: async ({ request }) => {
    const data = await request.formData();
    const id = parseInt(data.get("id")?.toString() || "0", 10);

    if (!id) {
      return fail(400, { error: "ID is required" });
    }

    try {
      await deleteUser(id);
      return { success: true };
    } catch (error) {
      return fail(500, {
        error: error instanceof Error ? error.message : "Failed to delete user",
      });
    }
  },
};
