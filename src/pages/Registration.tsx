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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-rose-100" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[45%] bg-cyan-200" />

      <div className="relative bg-white rounded-3xl shadow-lg w-[1100px] py-12 flex flex-col items-center">
        <Card className="w-[750px] shadow-md border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Sign up to start shopping</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-6">
            <div>
              <Label>First Name</Label>
              <Input placeholder="First Name" />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input placeholder="Last Name" />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="test@example.com" />
            </div>

            <div>
              <Label>Mobile Number</Label>
              <Input type="tel" placeholder="9876543210" />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="********" />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="********" />
            </div>

            <div className="col-span-2">
              <Label>Address</Label>
              <Input placeholder="Street address" />
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-6">
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

            <div className="col-span-2 flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                I agree to Terms & Conditions
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-6">
            <Button className="w-full">Create Account</Button>

            <p className="text-sm text-center text-gray-500">
              Already have an account? Login
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
