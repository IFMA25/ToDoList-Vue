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

export interface Category {
  key: string;
  value: string[];
  label: string;
}
