interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
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
