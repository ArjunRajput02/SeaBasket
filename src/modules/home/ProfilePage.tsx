import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "./useTrendingProduct";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slice/authSlice";

type ProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>();

  useEffect(() => {
    if (data) {
      reset({
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        email: data.data.email,
        phone: data.data.phone,
        address: data.data.address,
        city: data.data.city,
        state: data.data.state,
        pincode: data.data.pincode,
      });
    }
  }, [data, reset]);
  const onSubmit = (formData: ProfileForm) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        toast.error(`Update failed: ${error.message}`);
      },
    });
  };

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <Label>First Name</Label>
              <Input
                placeholder="First Name"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("first_name")}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Last Name</Label>
              <Input
                placeholder="Last Name"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("last_name")}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Mobile Number</Label>
              <Input
                placeholder="Phone"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-4">
            <Label>Shipping Address</Label>
            <Input
              placeholder="Address"
              className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <Label>City</Label>
              <Input
                placeholder="City"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("city")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>State</Label>
              <Input
                placeholder="State"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("state")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Pincode</Label>
              <Input
                placeholder="Pincode"
                className="border-orange-200 focus-visible:ring-orange-400 focus-visible:border-orange-400 h-11"
                {...register("pincode")}
              />
            </div>
          </div>

          <hr className="border-orange-100 mb-6" />

          <div className="flex gap-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-orange-400 hover:bg-orange-600 text-white h-11 font-semibold"
                >
                  Logout
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-orange-400 hover:bg-orange-600"
                  >
                    Yes, Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-orange-400 hover:bg-orange-600 text-white h-11 font-semibold"
            >
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
