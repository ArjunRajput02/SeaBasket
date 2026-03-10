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

const OTP = "123456";

export default function OtpVerification() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //function to check entered otp and actual otp
  const handleVerify = () => {
    if (code === OTP) {
      toast.success("OTP Verified Succesfully");
      navigate("/");
      setError("");
    } else {
      toast.error("Invalid OTP. Try again.");
    }
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

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <p className="text-center text-sm text-muted-foreground ">
            Didn't receive the code?{" "}
            <button className=" font-medium hover:underline text-orange-500">
              Resend
            </button>
          </p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleVerify}
            className="w-full  bg-orange-500 hover:bg-orange-600"
          >
            Verify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
