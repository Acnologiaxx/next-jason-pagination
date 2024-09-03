import axios from "axios";
import { User } from "@/types/user.types";

interface FetchUsersResponse {
  users: User[];
  total: number;
  totalPages: number;
}

const BASE_URL = "https://reqres.in/api/users";

export const fetchUsers = async (page: number): Promise<FetchUsersResponse> => {
  if (page < 1) {
    throw new Error("Page number must be greater than 0");
  }

  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&per_page=6`);

    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    const { data, total, total_pages: totalPages } = response.data ?? {};

    if (!data) {
      throw new Error("Invalid response structure");
    }

    return {
      users: data,
      total,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    } else {
      throw new Error("Failed to fetch users due to an unknown error");
    }
  }
};
