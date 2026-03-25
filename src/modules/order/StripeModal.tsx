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

export default function StripeModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();

  if (!isOpen) return null;

  const handlePay = async () => {
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", 
    });

    if (error) {
      toast.error(error.message || "Payment Failed. Try again.");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onSuccess(); 
    }
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
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
          >
            Pay Now
          </button>

          <button
            onClick={onClose}
            className="w-full border py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}