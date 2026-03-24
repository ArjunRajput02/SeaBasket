import { useState } from "react";
import { useMyOrders } from "@/hooks/useTrendingProduct";
import { Package, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const steps = [
  { label: "Placed", value: "placed" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

const statusMap: Record<string, string> = {
  PENDING: "placed",
  SUCCESS: "confirmed",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

export default function OrdersPage() {
  const { data, isLoading } = useMyOrders();
  const orders = data?.orders || [];
  const [openId, setOpenId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="p-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-3">
      <Header />
      <h1 className="text-xl font-bold">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-400 text-sm">No orders found</p>
      )}

      {orders.map((order: any) => {
        const isOpen = openId === order.id;

        const mappedStatus = statusMap[order.status] || "placed";
        let currentStep = steps.findIndex(
          (s) => s.value === mappedStatus.toLowerCase(),
        );
        if (currentStep === -1) currentStep = 0;

        return (
          <div
            key={order.id}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <div
              onClick={() => setOpenId(isOpen ? null : order.id)}
              className="flex justify-between items-center p-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-semibold text-sm">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-xs font-medium">{order.status}</p>
            </div>

            {isOpen && (
              <div className="p-4 border-t bg-gray-50 space-y-3 text-sm">
                <div className="flex items-center justify-between w-full mb-2">
                  {steps.map((step, index) => {
                    const done = index < currentStep;
                    const current = index === currentStep;

                    return (
                      <div
                        key={step.value}
                        className="flex-1 flex items-center"
                      >
                        <div className="flex flex-col items-center w-full">
                          <div
                            className={cn(
                              "w-6 h-6 flex items-center justify-center rounded-full text-xs border",
                              done && "bg-primary text-white border-primary",
                              current && "border-primary text-primary",
                              !done &&
                                !current &&
                                "bg-muted text-muted-foreground",
                            )}
                          >
                            {done ? <Check className="w-3 h-3" /> : index + 1}
                          </div>

                          <span className="text-[10px] mt-1 text-center">
                            {step.label}
                          </span>
                        </div>

                        {index !== steps.length - 1 && (
                          <div
                            className={cn(
                              "h-[2px] flex-1 mx-1",
                              index < currentStep ? "bg-primary" : "bg-muted",
                            )}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-semibold">{order.id}</span>
                </div>

                <div className="flex justify-between">
                  <span>Status:</span>
                  <span>{order.status}</span>
                </div>

                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span>{order.payment_mode}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>₹{order.total_amount}</span>
                </div>

                <div>
                  <p className="font-semibold mb-1">Address:</p>
                  <p className="text-gray-600">
                    {order.delivery_address}, {order.city}, {order.state} -{" "}
                    {order.pincode}
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-2">Items:</p>
                  <div className="space-y-2">
                    {order.items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between bg-white p-2 rounded border"
                      >
                        <div>
                          <p className="font-medium">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
