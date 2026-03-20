import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  verifyOtp,
  resendOtp,
} from "../modules/auth/authApi";
import { useDispatch } from "react-redux";
import { setToken, setSessionToken } from "@/store/slice/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { ApiError } from "@/utils/types";
import { clearCart } from "@/store/slice/cartSlice";
import { forgotPassword, resetPassword } from "../modules/auth/authApi";

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const login_token = data.data.token;
      dispatch(setToken(login_token));
      toast.success("Login successful");
      navigate("/verification");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Invalid credentials");
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const token = data?.data?.data?.token;
      toast.success("User Registered ");
      dispatch(setToken(token));
      navigate("/verification");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
};

export const useVerifyOtpMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      const session_token = data.data.data.token;
      dispatch(setSessionToken(session_token));
      dispatch(clearCart());
      toast.success("OTP Verified Successfully");
      navigate("/");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Invalid OTP");
    },
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      toast.success("New OTP sent to your email");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });
};

export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
      navigate("/login");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/login");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to reset password");
    },
  });
};
