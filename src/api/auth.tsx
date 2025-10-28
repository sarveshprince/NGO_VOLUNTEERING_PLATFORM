import axios, { type InternalAxiosRequestConfig } from "axios";

const API_BASE = "http://localhost:8080";

export interface LoginParams {
  username: string;
  passwordHash: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  passwordHash: string;
  role: string;
  phone?: string;
  location?: string;
  skills?: string;
  volunteerExperience?: string;
  communicationSettings?: string;
  dateOfBirth?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  [key: string]: any;
}

export interface NGOProfile {
  organizationName: string;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  // add other fields if needed
}
export interface LoginResponse {
  token: string;
  role: string;
  username: string;
  ngoProfile?: NGOProfile | null; // optional because not all users have it

}

export const login = async ({ username, passwordHash }: LoginParams): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API_BASE}/auth/login`, { username, passwordHash });

  if (res.data?.token) {
    localStorage.setItem("jwt", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("username", JSON.stringify(res.data.username));
  }

  return res.data;
};

export const register = async (params: RegisterParams): Promise<any> => {
  const res = await axios.post(`${API_BASE}/auth/register`, params);
  return res.data;
};

export const logout = (): void => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};

export const getToken = (): string | null => {
  try {
    return localStorage.getItem("jwt") || null;
  } catch (error) {
    console.error("Failed to get token from localStorage", error);
    return null;
  }
};

export const getRole = (): string | null => {
  try {
    return localStorage.getItem("role") || null;
  } catch (error) {
    console.error("Failed to get role from localStorage", error);
    return null;
  }
};

export const getUser = () => {
  const userStr = localStorage.getItem("username");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    console.warn("Failed to parse user from localStorage");
    return null;
  }
};

export const sendOtp = (payload: { email: string }) => {
  return axios.post(`${API_BASE}/forgot-password`, payload);
};

export const verifyOtpAndResetPassword = (payload: { email: string; otp: string; newPassword: string }) => {
  return axios.post(`${API_BASE}/reset-password`, payload);
};

// Attach JWT to all Axios requests
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token && config.headers) {
    if (typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
