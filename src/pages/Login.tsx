import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid md:grid-cols-[65%_35%] bg-white">
      <div className="flex items-center justify-center p-10">
        <Card className="w-full max-w-md shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Welcome back! Enter your details below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="test@gmail.com"
                    className="bg-orange-50"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>

                    <span className="ml-auto text-sm text-gray-400 cursor-pointer hover:underline">
                      Forgot password?
                    </span>
                  </div>

                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-orange-50"
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              SIGN IN →
            </Button>

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

      <div className="hidden md:flex items-center justify-start pl-10 bg-rose-100 overflow-hidden">
        <img
          src="/shopping.png"
          alt="shopping"
          className="w-80 animate-[float_6s_ease-in-out_infinite]"
        />
      </div>
    </div>
  );
}
