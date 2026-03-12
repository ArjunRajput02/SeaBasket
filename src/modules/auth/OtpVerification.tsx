import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyOtpMutation } from "./authMutation";
import { useResendOtpMutation } from "./authMutation";
import { z } from "zod";
import { useEffect } from "react";

const otpSchema = z
  .string()
  .regex(/^\d*$/, "Only numbers allowed")
  .max(6, "OTP must be 6 digits");

export default function OtpVerification() {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);

  const { mutate: verify, isPending } = useVerifyOtpMutation();
  const { mutate: resendOtp, isPending: resendPending } =
    useResendOtpMutation();

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    verify(
      { otp: code },
    );
  };
  const handleResend = () => {
   resendOtp();  
   setTimer(60);
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
              onChange={(value) => {
                const result = otpSchema.safeParse(value);
                if (result.success) {
                  setCode(value);
                }
              }}
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
              disabled={resendPending || timer > 0}
              className="font-medium hover:underline text-orange-500 disabled:text-gray-400"
            >
              {resendPending
                ? "Sending..."
                : timer > 0
                  ? `Resend in ${timer}s`
                  : "Resend"}
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
