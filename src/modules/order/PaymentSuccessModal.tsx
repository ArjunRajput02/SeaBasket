import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PaymentSuccessModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-[90%] max-w-md bg-white rounded-3xl p-6 text-center shadow-2xl"
      >
        <h2 className="text-xl font-semibold text-green-600">
          Payment Successful
        </h2>

        <p className="text-gray-600 text-sm mt-2">
          Your order has been placed successfully.
        </p>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate("/order")}
            className="bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="border py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
