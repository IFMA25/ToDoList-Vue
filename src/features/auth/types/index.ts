import { Ref } from "vue";

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileResponse {
  email: string;
  name: string;
  id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  email: string;
  name: string;
  role: string;
}

export interface ValidationState {
  $error: boolean;
  $errors: Array<{
    $message?: string | Ref<string>;
  }>;
}
