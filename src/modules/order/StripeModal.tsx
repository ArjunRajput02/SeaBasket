import { useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order_id: number | null;
};

export default function StripeModal({ isOpen, onClose, order_id }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = ""; // unlock scroll
    }

    return () => {
      document.body.style.overflow = ""; // cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = async () => {
    if (!stripe || !elements || !order_id) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout?success=true&order_id=${order_id}`,
      },
    });

    if (error) {
      toast.error(error.message || "Payment Failed Please Try Again");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Secure Payment 💳
          </h2>
          <p className="text-sm text-gray-500">Pay safely using Stripe</p>
        </div>
        <div className="w-full border border-gray-200 rounded-xl p-5 bg-gray-50">
          <PaymentElement options={{ layout: "tabs" }} />
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handlePay}
            className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-emerald-200 transition-all hover:scale-[1.02]"
          >
            Pay Now
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
