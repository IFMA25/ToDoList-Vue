export type Option = Record<string, unknown>;

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

export interface UsersResponse {
  data: User[];
  pagination: Pagination;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
