import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, verifyOtp,resendOtp } from "./authApi";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: resendOtp,
  });
};