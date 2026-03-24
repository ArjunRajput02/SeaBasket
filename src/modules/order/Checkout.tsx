import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useTrendingProduct";
import { useCart, useCheckout } from "@/hooks/useAddtoCart";
import { useProductbyId } from "@/modules/product/getProducts";
import { IndianRupee } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeModal from "./StripeModal";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);

type PaymentState = {
  clientSecret: string;
  orderId: number;
} | null;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSingle = location.state?.isSingle || false;
  const productId = location.state?.productId;

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: cartData, isLoading: cartLoading } = useCart({
    enabled: !isSingle,
  });
  const { data: productData, isLoading: productLoading } = useProductbyId(
    productId,
    { enabled: isSingle },
  );

  const { mutate: checkout, isPending } = useCheckout();

  const [paymentState, setPaymentState] = useState<PaymentState>(null);

  const items = isSingle
    ? productData
      ? [
          {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            quantity: 1,
            image: productData.images?.[0]?.image_url,
          },
        ]
      : []
    : cartData?.cart?.map((item) => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images?.[0]?.image_url,
      })) || [];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
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

  const onSubmit = async (formData: any) => {
    if (!items.length) return;

    checkout(
      {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isSingle,
        productId: isSingle ? productId : undefined,
        paymentMode: formData.paymentMethod,
      },
      {
        onSuccess: (data) => {
          if (formData.paymentMethod === "ONLINE" && data.client_secret) {
            toast.success("Proceed to payment");

            setPaymentState({
              clientSecret: data.client_secret,
              orderId: data.order?.id,
            });
          } else if (formData.paymentMethod === "COD" && data.order?.id) {
            toast.success("Order Placed!");
            navigate(`/orders/${data.order.id}`);
          } else {
            toast.error("Unexpected checkout response");
          }
        },
      },
    );
  };

  const isLoading = profileLoading || cartLoading || productLoading;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-stone-100">
        <div className="flex items-center justify-center px-4 py-10">
          {isLoading ? (
            <p>Loading...</p>
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
                      {String(errors.address.message)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">
                      City
                    </label>
                    <input
                      {...register("city", { required: "City is required" })}
                      className={`w-full border rounded-xl px-4 py-3 ${
                        errors.city ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs">
                        {String(errors.city.message)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">
                      State
                    </label>
                    <input
                      {...register("state", { required: "State is required" })}
                      className={`w-full border rounded-xl px-4 py-3 ${
                        errors.state ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs">
                        {String(errors.state.message)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">
                      Pincode
                    </label>
                    <input
                      {...register("pincode", {
                        required: "Pincode is required",
                      })}
                      className={`w-full border rounded-xl px-4 py-3 ${
                        errors.pincode ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs">
                        {String(errors.pincode.message)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-400">Your cart is empty</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-gray-100">
                          <img
                            src={item.image || "/placeholder.png"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold truncate text-gray-800">
                            {item.name}
                          </p>
                        </div>
                        <div className="flex items-center text-sm font-semibold text-gray-800">
                          <IndianRupee size={14} />
                          {(item.price * item.quantity).toFixed(2)}
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
                      className={`flex items-center border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
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
                      className={`flex items-center border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
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
                  disabled={items.length === 0 || isPending}
                  className="w-full bg-orange-400 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors"
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

      {paymentState && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentState.clientSecret }}
        >
          <StripeModal
            isOpen={true}
            onClose={() => setPaymentState(null)}
            order_id={paymentState.orderId}
          />
        </Elements>
      )}
      <Footer />
    </>
  );
}
