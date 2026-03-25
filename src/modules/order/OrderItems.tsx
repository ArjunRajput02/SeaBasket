import { IndianRupee } from "lucide-react";

export default function OrderItems({ items }: any) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 px-1">
        Items
      </p>

      <div className="space-y-2">
        {items?.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {item.product?.name || "Product"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>

            <span className="flex items-center gap-1 text-sm font-bold text-indigo-600">
              <IndianRupee className="w-4 h-4" />
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
