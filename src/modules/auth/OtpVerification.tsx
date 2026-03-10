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
import { Input } from "@/components/ui/input";

const OTP = [1, 2, 3, 4, 5, 6];

export default function OtpVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //funcction to check entered otp and actual otp
  const handleVerify = () => {
    const enteredOtp = code.join("");
    const actualOtp = OTP.join("");

    if (enteredOtp === actualOtp) {
      toast.success("OTP Verified Succesfully");
      navigate("/");
      setError("");
    } else {
      toast.error("Invalid OTP. Try again.");
    }
  };


const handleChange = (value: string, index: number) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newCode = [...code];
  newCode[index] = value;
  setCode(newCode);

  if (value) {
    // If user type a number, focus next input
    const next = document.getElementById(`otp-${index + 1}`);
    if (next) next.focus();
  }
  //if user backwards or delete 
  else {
    const prev = document.getElementById(`otp-${index - 1}`);
    if (prev) prev.focus();
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
          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                className="h-12 w-12 text-center text-lg font-semibold"
              />
            ))}
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
