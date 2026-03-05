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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Sign up to start shopping</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input placeholder="John" />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="john@example.com" />
          </div>

          <div>
            <Label>Mobile Number</Label>
            <Input type="tel" placeholder="9876543210" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="********" />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="********" />
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <Input placeholder="Street address" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>City</Label>
              <Input placeholder="City" />
            </div>

            <div>
              <Label>State</Label>
              <Input placeholder="State" />
            </div>

            <div>
              <Label>Pincode</Label>
              <Input placeholder="500001" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              I agree to Terms & Conditions
            </label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">Create Account</Button>

          <p className="text-sm text-center text-gray-500">
            Already have an account? Login
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
