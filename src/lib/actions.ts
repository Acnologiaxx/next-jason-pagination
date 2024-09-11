"use server";

import { fetchUsers } from "@/services/user.service";
import { User } from "@/types/user.types";

export async function loadMoreUsers(page: number, initialUsers: User[]) {
  const nextPage = page + 1;
  try {
    const { users, totalPages } = await fetchUsers(nextPage);
    const updatedUsers = [...initialUsers, ...users];
    return { updatedUsers, totalPages, nextPage };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to load more users: ${error.message}`);
    } else {
      throw new Error("Failed to load more users due to an unknown error");
    }
  }
}
