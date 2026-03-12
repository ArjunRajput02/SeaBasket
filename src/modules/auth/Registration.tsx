import { Link } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
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
import FormError from "@/components/layout/FormError";
import type { registrationForm, TouchedFields } from "./authType";
import { useRegisterMutation } from "./authMutation";

//zod object for verify email
const registrationSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phone: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include a letter, number, and special character",
      ),
    confirmPassword: z.string(),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//infer schema for type check
type FormData = z.infer<typeof registrationSchema>;

export default function Registration() {
  const { mutate: register, isPending } = useRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<registrationForm>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  //for validating each field with zod schema
  const validateField = (name: keyof FormData, value: string) => {
    const fieldSchema = registrationSchema.shape[name];

    if (!fieldSchema) return;

    //safeParser is method in zod whicch return boolean value success or error
    const result = fieldSchema.safeParse(value);

    setErrors((prev) => ({
      ...prev,
      [name]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  //for validating when input change happens
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const fieldName = name as keyof FormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    validateField(fieldName, value);
  };

  //only showing error once input is clicked
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof FormData;

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  //submitting data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: registrationForm = {};
      const newTouched: TouchedFields = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
        newTouched[field] = true;
      });

      setErrors(fieldErrors);
      setTouched((prev) => ({ ...prev, ...newTouched }));
      return;
    }

    const { confirmPassword, ...payload } = formData;

    register(payload);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Sign up to start shopping</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Label>First Name</Label>
              <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
              />
              {touched.first_name && <FormError message={errors.first_name} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Last Name</Label>
              <Input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
              />
              {touched.last_name && <FormError message={errors.last_name} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
              />
              {touched.email && <FormError message={errors.email} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Phone"
              />
              {touched.phone && <FormError message={errors.phone} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
              />
              {touched.password && <FormError message={errors.password} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Confirm Password</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm Password"
              />
              {touched.confirmPassword && (
                <FormError message={errors.confirmPassword} />
              )}
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <Label>Address</Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Address"
              />
              {touched.address && <FormError message={errors.address} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>City</Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="City"
              />
              {touched.city && <FormError message={errors.city} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>State</Label>
              <Input
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="State"
              />
              {touched.state && <FormError message={errors.state} />}
            </div>

            <div className="flex flex-col gap-1">
              <Label>Pincode</Label>
              <Input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Pincode"
              />
              {touched.pincode && <FormError message={errors.pincode} />}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full mt-1 bg-orange-500 hover:bg-orange-600"
              disabled={isPending}
            >
              {isPending ? "Registering" : "Create Account "}
            </Button>

            <p className="text-sm text-center">
              Already have an account?
              <Link to="/login" className="text-orange-500 ml-1">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
