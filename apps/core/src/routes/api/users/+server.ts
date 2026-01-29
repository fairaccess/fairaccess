import { json } from "@sveltejs/kit";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "$lib/server/users";

export async function GET({ url }) {
  const id = url.searchParams.get("id");

  try {
    if (id) {
      const user = await getUserById(parseInt(id));
      return json(user || { error: "User not found" }, {
        status: user ? 200 : 404,
      });
    }

    const allUsers = await getUsers();
    return json(allUsers);
  } catch {
    return json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return json({ error: "Name and email are required" }, { status: 400 });
    }

    const user = await createUser(name, email);
    return json(user, { status: 201 });
  } catch {
    return json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PUT({ request }) {
  try {
    const { id, name, email } = await request.json();

    if (!id) {
      return json({ error: "ID is required" }, { status: 400 });
    }

    const user = await updateUser(id, { name, email });
    return json(user || { error: "User not found" }, {
      status: user ? 200 : 404,
    });
  } catch {
    return json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE({ request }) {
  try {
    const { id } = await request.json();

    if (!id) {
      return json({ error: "ID is required" }, { status: 400 });
    }

    await deleteUser(id);
    return json({ success: true });
  } catch {
    return json({ error: "Failed to delete user" }, { status: 500 });
  }
}
