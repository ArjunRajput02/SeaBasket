import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "./authMutation";
import { useResendOtpMutation } from "./authMutation";
import { useDispatch } from "react-redux";
import { setSessionToken } from "@/store/slice/authSlice";

export default function OtpVerification() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: verify, isPending } = useVerifyOtpMutation();
  const { mutate: resendOtp, isPending: resendPending } =
    useResendOtpMutation();

  const handleVerify = () => {
    verify(
      { otp: code },
      {
        onSuccess: (data) => {
          const session_token = data.data.data.token;
          dispatch(setSessionToken(session_token));

          toast.success("OTP Verified Successfully");
          navigate("/");
        },

        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Invalid OTP");
        },
      },
    );
  };
  const handleResend = () => {
    resendOtp(undefined, {
      onSuccess: () => {
        toast.success("New OTP sent to your email");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to resend OTP");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Confirm it's you</CardTitle>
          <CardDescription>
            Enter the 6-digit code we sent to your email
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup className="gap-3">
                <InputOTPSlot
                  index={0}
                  className="h-12 w-12 text-lg font-semibold rounded-md"
                />
                <InputOTPSlot
                  index={1}
                  className="h-12 w-12 text-lg font-semibold rounded-md"
                />
                <InputOTPSlot
                  index={2}
                  className="h-12 w-12 text-lg font-semibold rounded-md"
                />
                <InputOTPSlot
                  index={3}
                  className="h-12 w-12 text-lg font-semibold rounded-md"
                />
                <InputOTPSlot
                  index={4}
                  className="h-12 w-12 text-lg font-semibold rounded-md"
                />
                <InputOTPSlot
                  index={5}
                  className="h-12 w-12 text-lg font-semibold rounded-md"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              disabled={resendPending}
              className="font-medium hover:underline text-orange-500"
            >
              {resendPending ? "Sending..." : "Resend"}
            </button>
          </p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleVerify}
            disabled={isPending}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {isPending ? "Verifying..." : "Verify"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
