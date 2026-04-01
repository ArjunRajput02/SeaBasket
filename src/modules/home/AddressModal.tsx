import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

const addressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
});

type AddressForm = z.infer<typeof addressSchema>;

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (data: AddressForm) => void;
  onUpdate?: (id: number, data: AddressForm) => void;
  initialData?: any;
};

export default function AddressModal({
  open,
  onClose,
  onAdd,
  onUpdate,
  initialData,
}: AddressModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        address: initialData.address,
        city: initialData.city,
        state: initialData.state,
        pincode: initialData.pincode,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: AddressForm) => {
    if (initialData && onUpdate) {
      onUpdate(initialData.id, data);
    } else {
      onAdd(data);
    }

    reset();
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-xl overflow-hidden shadow-lg border border-orange-100 animate-in fade-in zoom-in-95">
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500" />

        <div className="px-6 pt-5 pb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? "Update Address" : "Add New Address"}
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            {initialData
              ? "Update your delivery address."
              : "Enter the details of your new delivery address."}
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <Label>Street Address</Label>
              <Input
                placeholder="Your Address Here"
                className="border-orange-200 focus-visible:ring-orange-400 h-11 mt-2"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  placeholder="City"
                  className="border-orange-200 focus-visible:ring-orange-400 h-11 mt-2"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city.message}</p>
                )}
              </div>

              <div>
                <Label>State</Label>
                <Input
                  placeholder="State"
                  className="border-orange-200 focus-visible:ring-orange-400 h-11 mt-2"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Pincode</Label>
              <Input
                placeholder="6-digit pincode"
                maxLength={6}
                className="border-orange-200 focus-visible:ring-orange-400 h-11 mt-2"
                {...register("pincode")}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs">{errors.pincode.message}</p>
              )}
            </div>

            <hr className="border-orange-100 my-1" />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-11 border-orange-200 text-orange-500 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 bg-orange-400 hover:bg-orange-600 text-white"
              >
                Save Address
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}
