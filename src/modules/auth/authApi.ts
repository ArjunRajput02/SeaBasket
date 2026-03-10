import axios from "axios";
import type { RegisterPayload, LoginPayload, OtpPayload } from "./authType";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_USER,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data: RegisterPayload) => {
  return API.post("/sign-up", data);
};

export const verifyOtp = (data: OtpPayload) => {
  const token = localStorage.getItem("token");
  return API.post("/verify-login-otp", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = (data: LoginPayload) => {
  return API.post("/sign-in", data);
};
