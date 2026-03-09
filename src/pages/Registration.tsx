import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Registration() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden px-4 py-6">
      <div className="absolute top-0 right-0 w-[60%] md:w-[45%] h-[40%] bg-rose-100" />
      <div className="absolute bottom-0 left-0 w-[60%] md:w-[45%] h-[40%] bg-cyan-200" />

      <div className="relative w-full max-w-5xl">
        <Card className="shadow-lg border-0 rounded-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-semibold">
              Create Account
            </CardTitle>
            <CardDescription>Sign up to start shopping</CardDescription>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <Label className="ml-1">First Name</Label>
              <Input placeholder="First Name" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="ml-1">Last Name</Label>
              <Input placeholder="Last Name" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="ml-1">Email</Label>
              <Input type="email" placeholder="test@example.com" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="ml-1">Mobile Number</Label>
              <Input type="tel" placeholder="9876543210" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="ml-1" >
                Password
              </Label>
              <Input type="password" placeholder="********" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="ml-1">Confirm Password</Label>
              <Input type="password" placeholder="********" />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label className="ml-1">Address</Label>
              <Input placeholder="Street address" />
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <Label className="ml-1">City</Label>
                <Input placeholder="City" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="ml-1">State</Label>
                <Input placeholder="State" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="ml-1">Pincode</Label>
                <Input placeholder="500001" />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center space-x-2 pt-1">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to Terms & Conditions
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              Create Account
            </Button>

            <p className="text-sm text-center text-gray-500">
              Already have an account?
              <Link to="/login" className="text-orange-500 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
