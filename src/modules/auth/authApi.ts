import axios from "axios";
import { store } from "@/store/store";
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
  const token = store.getState().auth.token;//use getState for Ts file to get the token
  return API.post("/verify-login-otp", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = (data: LoginPayload) => {
  return API.post("/sign-in", data);
};

export const resendOtp = () => {
  const token = store.getState().auth.token;
  console.log(token);
  return API.post(
    "/resend-otp",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
