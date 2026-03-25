import Header from "@/components/layout/Header";
import CartItem from "./CartItem";
import { useCart } from "@/hooks/useAddtoCart";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { IndianRupee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useAddtoCart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { data } = useCart();
  const navigation = useNavigate();
  const sessionToken = useSelector((state: any) => state.auth.sessionToken);
  const reduxCart = useSelector((state: any) => state.cart.items);
  const isLoggedIn = !!sessionToken;

  const { isPending } = useCheckout();

  const cartItems = isLoggedIn
    ? data?.cart?.map((item: any) => ({
        id: item.product_id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.images?.[0]?.image_url || "",
        quantity: item.quantity,
      })) || []
    : reduxCart;

  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

const handleCheckout = () => {
  if (!isLoggedIn) {
    toast.error("Please login to place an order.");
    navigation("/login");
    return;
  }

  navigation("/checkout", {
    state: { isSingle: false }, 
  });
};

  if (!cartItems.length) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
          <p className="text-gray-500 font-medium">Your cart is empty </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">My Cart</h1>

        <div className="space-y-3 mb-6">
          {cartItems.map((item: any) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <h2 className="font-semibold text-gray-800 text-sm">Bill Summary</h2>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="flex items-center gap-0.5 text-gray-700">
              <IndianRupee size={12} />
              {subtotal.toFixed(2)}
            </span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="flex items-center gap-0.5">
              <IndianRupee size={14} />
              {subtotal.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={isPending}
            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold gap-2 mt-1"
          >
            {isPending ? (
              "Placing Order..."
            ) : (
              <>
                Proceed to Checkout <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
