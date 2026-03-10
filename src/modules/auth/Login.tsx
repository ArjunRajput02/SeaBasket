import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, type FormEvent } from "react";
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
import { useLoginMutation } from "./authMutation";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate: login, isPending } = useLoginMutation();

  //validate user
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    login(
      {
        login: username,
        password,
      },
      {
        onSuccess: (data) => {
          const login_token = data.data.token;
          localStorage.setItem("token", login_token);
          toast.success("Login successful");
          navigate("/verification");
        },

        onError: (error: any) => {
          toast.error(error.response?.data?.message || "Invalid credentials");
        },
      },
    );
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter an email or phone"
                    className="bg-orange-50"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-orange-50"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <span className="text-sm text-orange-400 cursor-pointer hover:underline w-fit ml-auto">
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

      {/* Animating shopping logo here with framer motion*/}
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
