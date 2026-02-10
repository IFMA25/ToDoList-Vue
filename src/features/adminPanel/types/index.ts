export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface UsersResponse {
  data: User[];
  pagination: Pagination;
}

export type UserResponse = Omit<User, "updatedAt">;

export interface Permission {
  key: string;
  value: string;
  category: string;
  description: string;
}

export type PermissionRole = {
  ADMIN: string[];
  USER: string[];
};

export interface DeleteResponse {
  message: string;
}

export interface RoleOption {
  label: string;
  value: string | undefined;
  [key: string]: unknown;
}

export interface SortOption {
  key: string;
  label: string;
  params: {
    sort: string;
    order: "asc" | "desc";
  };
  [key: string]: unknown;
}

