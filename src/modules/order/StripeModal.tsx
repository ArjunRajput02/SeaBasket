import { useState } from "react";
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
  onSuccess: () => void;
};

export default function StripeModal({ isOpen, onClose, onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = async () => {
    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment Failed. Try again.");
      setIsProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-[92%] max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[85vh]"
      >
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Complete Payment
          </h2>
          <p className="text-sm text-gray-500">
            Secure checkout powered by Stripe
          </p>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          <div className="border rounded-xl p-4 bg-gray-50">
            <PaymentElement
              options={{
                layout: "tabs",
                paymentMethodOrder: ["card"],
              }}
            />
          </div>
        </div>

        <div className="p-5 border-t flex flex-col gap-3">
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className={`w-full py-3 rounded-xl font-medium transition ${
              isProcessing
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full border py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
