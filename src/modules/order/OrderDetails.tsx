import { useState } from "react";
import { useMyOrders, useOrderById } from "@/hooks/useTrendingProduct";
import { Package } from "lucide-react";

function OrderDetail({ id }: { id: number }) {
  const { data, isLoading } = useOrderById(id.toString());
  const order = data?.order;

  if (isLoading) return <div className="p-4 text-sm">Loading...</div>;
  if (!order) return <div className="p-4 text-sm">No data</div>;

  return (
    <div className="p-4 border-t bg-gray-50 space-y-3 text-sm">
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
  );
}

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
      <h1 className="text-xl font-bold">My Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-400 text-sm">No orders found</p>
      )}

      {orders.map((order: any) => {
        const isOpen = openId === order.id;

        return (
          <div
            key={order.id}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <div
              onClick={() =>
                setOpenId(isOpen ? null : order.id)
              }
              className="flex justify-between items-center p-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-semibold text-sm">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-xs font-medium">
                {order.status}
              </p>
            </div>

            {isOpen && <OrderDetail id={order.id} />}
          </div>
        );
      })}
    </div>
  );
}