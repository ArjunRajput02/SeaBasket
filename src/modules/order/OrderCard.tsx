import { useState } from "react";
import {
  Package,
  ChevronDown,
  MapPin,
  CreditCard,
  Hash,
  IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_STYLE } from "@/utils/constants";
import OrderStepper from "./OrderStepper";
import OrderItems from "./OrderItems";

export default function OrderCard({ order }: any) {
  const [open, setOpen] = useState(false);

  const style = STATUS_STYLE[order.status?.toLowerCase()] ?? {
    badge: "bg-gray-100 text-gray-500 ring-gray-200",
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md">
      <button
        onClick={() => setOpen((open) => !open)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center rounded-xl">
          <Package className="text-indigo-500" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate">Order #{order.id}</p>
          <p className="text-xs text-gray-400">
            {new Date(order.created_at).toLocaleString("en-IN")}
          </p>
        </div>

        <span
          className={cn(
            "px-2.5 py-1 text-[11px] rounded-full ring-1",
            style.badge,
          )}
        >
          {order.status}
        </span>

        <ChevronDown className={cn("transition", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t bg-gray-50/60 px-4 pt-4 pb-5 space-y-5">
          <div className="bg-white rounded-xl p-4 border">
            <OrderStepper status={order.status} />
          </div>

          <div className="bg-white rounded-xl px-4 py-1 border">
            <div className="flex justify-between py-2 border-b">
              <span className="text-xs text-gray-500">Order ID</span>
              <span className="flex items-center gap-1 text-sm font-semibold">
                <Hash className="w-3 h-3" /> {order.id}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-xs text-gray-500">Payment</span>
              <span className="flex items-center gap-1 text-sm font-semibold">
                <CreditCard className="w-3 h-3" /> {order.payment_mode}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-xs text-gray-500">Total</span>
              <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {order.total_amount}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-xs text-gray-500">Address</span>
              <span className="flex items-center gap-1 text-right text-sm font-semibold max-w-[200px]">
                <MapPin className="w-3 h-3 shrink-0" />
                {order.delivery_address}, {order.city}, {order.state}{" "}
                {order.pincode}
              </span>
            </div>
          </div>

          <OrderItems items={order.items} />
        </div>
      )}
    </div>
  );
}
