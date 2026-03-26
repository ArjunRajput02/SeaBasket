import { Package, ChevronRight, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Order } from "./homeType";

const STATUS_STYLES: Record<Order["status"], string> = {
  PAID: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function Orders({
  orders,
  ordersLoading,
}: {
  orders: Order[];
  ordersLoading: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center gap-2 mb-6">
        <Package className="text-orange-400" size={20} />
        <h2 className="text-xl font-semibold">My Orders</h2>
      </div>

      {ordersLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Package size={48} className="mb-3 opacity-30" />
          <p className="text-sm">No orders placed yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-orange-100 rounded-lg p-4 hover:shadow-sm transition cursor-pointer"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-semibold">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate max-w-[60%]">
                      {item.product.name}
                    </span>
                    <span className="font-medium">
                      <span className="font-medium flex items-center gap-1">
                        <IndianRupee size={14} />
                        {Number(item.price) * item.quantity}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-3 font-semibold text-sm">
                <span>Total</span>
                <span>
                  <span className="flex items-center gap-1">
                    <IndianRupee size={14} />
                    {Number(order.total_amount)}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
