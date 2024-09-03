import axios from "axios";
import { User } from "@/types/user.types";

interface FetchUsersResponse {
  users: User[];
  total: number;
  totalPages: number;
}

export const fetchUsers = async (page: number): Promise<FetchUsersResponse> => {
  if (page < 1) {
    throw new Error("Page number must be greater than 0");
  }

  try {
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=6`
    );

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    if (!response.data?.data) {
      throw new Error("Invalid response structure");
    }

    return {
      users: response.data.data,
      total: response.data.total,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};