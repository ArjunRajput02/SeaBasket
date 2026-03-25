import { useMyOrders } from "@/hooks/useTrendingProduct";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrderCard from "./OrderCard";
import { Package } from "lucide-react";

export default function OrdersDetails() {
  const { data, isLoading } = useMyOrders();
  const orders = data?.orders ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fc]">
      <div className="w-full bg-white shadow-sm">
        <Header />
      </div>

      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>

          {isLoading ? (
            <div>Loading...</div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <Package className="w-10 h-10 text-indigo-300" />
              <p className="text-gray-500 mt-2">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="w-full bg-white border-t">
        <Footer />
      </div>
    </div>
  );
}
