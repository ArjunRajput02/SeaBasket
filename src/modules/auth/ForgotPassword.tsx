import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormError from "@/components/layout/FormError";
import { useForgotPasswordMutation } from "@/hooks/authMutation";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-[65%_35%] bg-gray-50 relative">
      <div
        className="absolute top-4 left-4 flex items-center cursor-pointer z-10"
        onClick={() => navigate("/")}
      >
        <img
          src="/seaBasket.png"
          alt="SeaBasket Logo"
          className="w-10 h-10 mr-2"
        />
        <span className="text-2xl font-bold text-gray-800">SeaBasket</span>
      </div>

      <div className="flex items-center justify-center p-10">
        <Card className="w-full max-w-md bg-white shadow-2xl border border-gray-100 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Forgot Password
            </CardTitle>
            <CardDescription>
              Enter your registered email and we'll send you a reset link.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-orange-50"
                    {...register("email")}
                  />
                  {errors.email && (
                    <FormError message={errors.email.message!} />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isPending ? "Sending..." : "SEND RESET LINK"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <p className="text-sm text-gray-500 text-center">
              Remembered your password?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-orange-500 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="hidden md:flex items-center justify-start pl-10 bg-rose-100 overflow-hidden">
        <motion.img
          src="/shopping.png"
          alt="shopping"
          className="w-80"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
