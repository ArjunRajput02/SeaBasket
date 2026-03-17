import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartItemProps = {
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartItem({
  name,
  price,
  image,
  quantity,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {name}
        </h2>
        <p className="text-orange-500 font-semibold mt-1">₹{price}</p>

        <div className="flex items-center gap-2 mt-2">
          <Button size="icon" variant="outline" className="h-8 w-8">
            <Minus size={14} />
          </Button>

          <span className="text-sm font-medium">{quantity}</span>

          <Button size="icon" variant="outline" className="h-8 w-8">
            <Plus size={14} />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-50"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
