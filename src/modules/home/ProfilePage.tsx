import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddressModal from "./AddressModal";
import { useEffect } from "react";
import {
  useProfile,
  useUpdateProfile,
  useMyOrders,
} from "../../hooks/useTrendingProduct";
import { Label } from "@/components/ui/label";
import AddressList from "./AddressList";
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
import type { Order } from "./homeType";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slice/authSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Orders from "./Orders";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { useDeleteAddress } from "@/hooks/useTrendingProduct";
import { useAddressActions } from "@/hooks/useAddressAction";

const profileSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "First name must contain letters only"),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name must contain letters only"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
});

export type ProfileForm = z.infer<typeof profileSchema>;

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useProfile();
  const { mutate, isPending } = useUpdateProfile();
  const { data: ordersData, isLoading: ordersLoading } = useMyOrders();
  const orders: Order[] = ordersData?.orders ?? [];
  const { mutate: deleteAddress } = useDeleteAddress();

  const { handleAdd, handleUpdate } = useAddressActions();

  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!data?.data) return;

    reset({
      first_name: data.data.first_name,
      last_name: data.data.last_name,
      email: data.data.email,
      phone: data.data.phone,
    });
  }, [data, reset]);

  const onSubmit = (formData: ProfileForm) => {
    mutate(formData);
  };

  const handleEditClick = (addr: any) => {
    setSelectedAddress(addr);
    setOpen(true);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  const handleDelete = (id: number) => {
    deleteAddress(id);
  };

  const addresses = data?.data?.addresses ?? [];

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8 gap-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold">My Profile</h1>
            <p className="text-sm text-gray-500">
              Update your personal details
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <Label>First Name</Label>
                <Input
                  placeholder="First Name"
                  className="border-orange-200 focus-visible:ring-orange-400 h-11"
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
                  className="border-orange-200 focus-visible:ring-orange-400 h-11"
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
                  disabled
                  className="border-orange-200 focus-visible:ring-orange-400 h-11 cursor-not-allowed"
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
                  className="border-orange-200 focus-visible:ring-orange-400 h-11"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <hr className="border-orange-100 mb-6" />

            <div className="flex gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-orange-400 hover:bg-orange-600 text-white hover:text-white h-11 font-semibold"
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
                    <AlertDialogAction asChild>
                      <Button
                        onClick={handleLogout}
                        className="bg-orange-400 hover:bg-orange-600 text-white"
                      >
                        Yes, Logout
                      </Button>
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

        <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">My Addresses</h2>

            <Button
              onClick={() => {
                setSelectedAddress(null);
                setOpen(true);
              }}
              className="bg-orange-400 hover:bg-orange-600 text-white"
            >
              + Add Address
            </Button>
          </div>

          <AddressList
            addresses={addresses}
            user={data?.data}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>

        <Orders orders={orders} ordersLoading={ordersLoading} />
      </main>
      <Footer />

      <AddressModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={(data) => handleAdd(data, () => setOpen(false))}
        onUpdate={(id, data) => handleUpdate(id, data, () => setOpen(false))}
        initialData={selectedAddress}
      />
    </div>
  );
}
