import axios from "axios";
import { store } from "@/store/store";
import type {
  RegisterPayload,
  LoginPayload,
  OtpPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "./authType";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data: RegisterPayload) => {
  return API.post("/users/sign-up", data);
};

export const verifyOtp = (data: OtpPayload) => {
  const token = store.getState().auth.token; //use getState for Ts file to get the token
  return API.post("/users/verify-login-otp", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = (data: LoginPayload) => {
  return API.post("/users/sign-in", data);
};

export const resendOtp = () => {
  const token = store.getState().auth.token;
  return API.post(
    "/users/resend-otp",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const forgotPassword = (data: ForgotPasswordPayload) => {
  return API.post("/users/forgot-password", data);
};

export const resetPassword = (data: ResetPasswordPayload) => {
  return API.post("/users/reset-password", data);
};
