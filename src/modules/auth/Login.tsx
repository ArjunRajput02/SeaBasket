import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent } from "react";
import PasswordInput from "@/components/layout/PasswordInput";
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
import { useLoginMutation } from "../../hooks/authMutation";
import { z } from "zod";
import FormError from "@/components/layout/FormError";
import type { LoginFormErrors } from "./authType";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Email or phone is required")
    //schema for checking email or password
    .refine((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }, "Enter a valid email or 10 digit phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include a letter, number, and special character",
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { mutate: login, isPending } = useLoginMutation();
  const [formData, setFormData] = useState<LoginSchemaType>({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  //validate user
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginFormErrors;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    login(formData, {
      onSuccess: () => {
        navigate("/verification", {
          state: { from },
        });
      },
    });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-[65%_35%] bg-gray-50 relative">
      <div
        className="absolute top-4 left-4 flex items-center cursor-pointer"
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
            <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Welcome back! Enter your details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="login">Email</Label>
                  <Input
                    id="login"
                    placeholder="Enter email or phone"
                    className="bg-orange-50"
                    value={formData.login}
                    onChange={handleChange}
                  />
                  {errors.login && <FormError message={errors.login} />}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>

                  <PasswordInput
                    id="password"
                    placeholder="********"
                    className="bg-orange-50"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                  />

                  {errors.password && <FormError message={errors.password} />}

                  <span
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-orange-400 cursor-pointer hover:underline w-fit ml-auto"
                  >
                    Forgot password?
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isPending ? "Logging in..." : "LOG IN"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <p className="text-sm text-gray-500 text-center">
              Don't have an account?
              <span
                onClick={() => navigate("/registration")}
                className="text-orange-500 ml-1 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Animation */}
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
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
