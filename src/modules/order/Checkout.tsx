import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "@/hooks/useTrendingProduct";
import { useCart, useCheckout } from "@/hooks/useAddtoCart";
import { IndianRupee } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
  const [paySuccess, setPaySuccess] = useState(false);

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: cartData, isLoading: cartLoading } = useCart();
  const { mutate: checkout, isPending } = useCheckout();

  const cartItems = cartData?.cart || [];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const total = subtotal;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedPayment = watch("paymentMethod");

  useEffect(() => {
    if (profileData?.data) {
      reset({
        fullName: `${profileData.data.first_name} ${profileData.data.last_name}`,
        email: profileData.data.email,
        phone: profileData.data.phone,
        address: profileData.data.address,
        city: profileData.data.city,
        state: profileData.data.state,
        pincode: profileData.data.pincode,
        paymentMethod: "COD",
      });
    }
  }, [profileData, reset]);

  const onSubmit = (formData: any) => {
    if (cartItems.length === 0) return;

    checkout({
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      isSingle: false,
      paymentMode: formData.paymentMethod,
    });
  };

  const isLoading = profileLoading || cartLoading;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-stone-100">
        <div className="flex items-center justify-center px-4 py-10">
          {isLoading ? (
            <p>Loading...</p>
          ) : paySuccess ? (
            <div className="bg-white rounded-3xl shadow-md p-10 flex flex-col items-center gap-4 max-w-sm w-full">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Placed!
              </h2>
              <p className="text-gray-500 text-sm text-center">
                Your order has been successfully placed.
              </p>
              <button
                onClick={() => setPaySuccess(false)}
                className="w-full bg-orange-400 hover:bg-orange-600 text-white rounded-xl py-3"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8"
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm space-y-5">
                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600">
                    Address
                  </label>
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    className={`w-full border rounded-xl px-4 py-3 ${
                      errors.address ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">
                      City
                    </label>
                    <input
                      {...register("city", {
                        required: "City is required",
                      })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600">
                      State
                    </label>
                    <input
                      {...register("state", {
                        required: "State is required",
                      })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600">
                      Pincode
                    </label>
                    <input
                      {...register("pincode", {
                        required: "Pincode is required",
                      })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-400">Your cart is empty</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-gray-100">
                          <img
                            src={
                              item.product.images?.[0]?.image_url ||
                              "/placeholder.png"
                            }
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-semibold truncate text-gray-800">
                            {item.product.name}
                          </p>
                        </div>

                        <div className="flex items-center text-sm font-semibold text-gray-800">
                          <IndianRupee size={14} />
                          {(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-4 mb-4 text-gray-800">
                  <span>Total</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {total.toFixed(2)}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700">
                    Payment Method
                  </h3>

                  <div className="space-y-3">
                    <label
                      className={`flex items-center border rounded-xl px-4 py-3 cursor-pointer ${
                        selectedPayment === "COD"
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="COD"
                        {...register("paymentMethod")}
                        className="mr-3"
                      />
                      Cash on Delivery
                    </label>

                    <label
                      className={`flex items-center border rounded-xl px-4 py-3 cursor-pointer ${
                        selectedPayment === "ONLINE"
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value="ONLINE"
                        {...register("paymentMethod")}
                        className="mr-3"
                      />
                      Online Payment
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={cartItems.length === 0 || isPending}
                  className="w-full bg-orange-400 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl"
                >
                  {isPending
                    ? "Processing..."
                    : selectedPayment === "COD"
                      ? "Place Order"
                      : "Proceed to Pay"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
