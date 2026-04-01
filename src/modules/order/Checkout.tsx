import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProfile } from "@/hooks/useTrendingProduct";
import { useCart, useCheckout } from "@/hooks/useAddtoCart";
import { useProductbyId } from "@/modules/product/getProducts";
import { IndianRupee } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeModal from "./StripeModal";
import PaymentSuccessModal from "./PaymentSuccessModal";
import AddressModal from "@/modules/home/AddressModal";
import { toast } from "sonner";
import type { CartItemProps } from "./cartTypes";
import type { PaymentState } from "./cartType";
import { useAddressActions } from "@/hooks/useAddressAction";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE);

export default function CheckoutPage() {
  const location = useLocation();
  const isSingle = location.state?.isSingle || false;
  const productId = location.state?.productId;

  const [paymentState, setPaymentState] = useState<PaymentState>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: cartData, isLoading: cartLoading } = useCart();
  const { data: productData, isLoading: productLoading } =
    useProductbyId(productId);
  const { handleAdd } = useAddressActions();

  const { mutate: checkout, isPending } = useCheckout();

  const items: CartItemProps[] = isSingle
    ? productData
      ? [
          {
            id: productData.id,
            name: productData.name,
            price: Number(productData.price) || 0,
            finalPrice:
              productData.finalPrice || Number(productData.price) || 0,
            discount: Number(productData.discount) || 0,
            quantity: 1,
            image: productData.images?.[0]?.image_url,
          },
        ]
      : []
    : cartData?.cart?.map((item: any) => ({
        id: item.id,
        name: item.product.name,
        price: Number(item.product.price) || 0,
        finalPrice: item.product.finalPrice || Number(item.product.price) || 0,
        discount: Number(item.product.discount) || 0,
        quantity: item.quantity || 1,
        image: item.product.images?.[0]?.image_url,
      })) || [];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalAfterDiscount = items.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0,
  );

  const discountAmount = subtotal - totalAfterDiscount;

  useEffect(() => {
    if (profileData?.data?.addresses?.length) {
      setSelectedAddress(profileData.data.addresses[0]);
    }
  }, [profileData]);

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    if (!items.length) return;

    checkout(
      {
        addressId: selectedAddress.id,
        isSingle,
        productId: isSingle ? productId : undefined,
        paymentMode: paymentMethod,
      },
      {
        onSuccess: (data) => {
          if (paymentMethod === "ONLINE" && data.client_secret) {
            setPaymentState({
              clientSecret: data.client_secret,
            });
          } else if (paymentMethod === "COD") {
            toast.success("Order Placed!");
            setShowSuccess(true);
          } else {
            toast.error("Unexpected checkout Happened");
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
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm space-y-6">
                <h2 className="text-lg font-semibold">Select Address</h2>

                {profileData?.data?.addresses?.map((addr: any) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer ${
                      selectedAddress?.id === addr.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAddress?.id === addr.id}
                      onChange={() => setSelectedAddress(addr)}
                    />

                    <div>
                      <p className="font-medium">{addr.address}</p>
                      <p className="text-sm text-gray-500">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>
                  </label>
                ))}

                <button
                  onClick={() => setShowAddressModal(true)}
                  className="text-orange-500 font-semibold text-sm"
                >
                  + Add New Address
                </button>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-6">
                <h2 className="text-xs font-bold text-gray-500 uppercase mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-400">Your cart is empty</p>
                  ) : (
                    items.map((item: CartItemProps) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-gray-100">
                          <img
                            src={item.image || "/seaBasket.png"}
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
                          {(
                            (item.finalPrice ?? item.price) * item.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- {discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold border-t pt-3">
                    <span>Total</span>
                    <span>{totalAfterDiscount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                    />
                    Cash on Delivery
                  </label>

                  <label className="flex gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "ONLINE"}
                      onChange={() => setPaymentMethod("ONLINE")}
                    />
                    Online Payment
                  </label>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={!items.length || isPending}
                  className="w-full bg-orange-400 hover:bg-orange-600 disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors"
                >
                  {isPending
                    ? "Processing..."
                    : paymentMethod === "COD"
                      ? "Place Order"
                      : "Proceed to Pay"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {showAddressModal && (
        <AddressModal
          open={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          onAdd={(data) => handleAdd(data, () => setShowAddressModal(false))}
        />
      )}

      {paymentState && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentState.clientSecret }}
        >
          <StripeModal
            isOpen={true}
            onClose={() => setPaymentState(null)}
            onSuccess={() => {
              setPaymentState(null);
              setShowSuccess(true);
            }}
          />
        </Elements>
      )}

      <PaymentSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
