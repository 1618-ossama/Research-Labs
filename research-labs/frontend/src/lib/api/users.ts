const API_BASE_URL = "http://127.0.0.1:6188/nodejs/api/profiles";

export interface ApiUser {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  photo_url: string | null;
  role: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | null;
  affiliation: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  role: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST";
  affiliation?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  role?: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST";
  affiliation?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data?: T;
  message?: string;
  error?: string;
}

const getAuthHeaders = (): HeadersInit => {
  return {
    "Content-Type": "application/json",
  };
};

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const data: ApiResponse<T> = await response.json().catch(() => ({
    success: false,
    message: "Unknown error occurred"
  }));

  if (!response.ok || !data.success) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data.data as T;
};

export const userApi = {
  getUserById: async (userId: string): Promise<ApiUser> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    return handleApiResponse<ApiUser>(response);
  },

  getAllUsers: async (): Promise<ApiUser[]> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    const users = await handleApiResponse<ApiUser[]>(response);
    return users || [];
  },

  createUser: async (userData: CreateUserRequest): Promise<{ userId: string }> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });

    return handleApiResponse<{ userId: string }>(response);
  },

  updateUser: async (userId: string, userData: UpdateUserRequest): Promise<{ userId: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });

    return handleApiResponse<{ userId: string }>(response);
  },

  activateUser: async (userId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/activate`, {
      method: "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
    });

    return handleApiResponse<{ message: string }>(response);
  },

  suspendUser: async (userId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/suspend`, {
      method: "PUT",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    return handleApiResponse<{ message: string }>(response);
  },

  notifyDeleteUser: async (userId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/notify-delete`, {
      method: "PUT",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    return handleApiResponse<{ message: string }>(response);
  },

  deleteUser: async (userId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: getAuthHeaders(),
    });

    return handleApiResponse<{ message: string }>(response);
  },
};
