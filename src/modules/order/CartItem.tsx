import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, IndianRupee } from "lucide-react";
import type { CartItemProps } from "./cartTypes";
import {
  useAddToCart,
  useDecreaseFromCart,
  useDeleteFromCart,
} from "@/hooks/useAddtoCart";

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
}: CartItemProps) {
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { mutate: decreaseFromCart, isPending: isDecreasing } =
    useDecreaseFromCart();
  const { mutate: deleteFromCart, isPending: isDeleting } = useDeleteFromCart();

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


        <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
          <IndianRupee size={14} />
          <span>{price}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => decreaseFromCart(id)}
            disabled={isDecreasing}
          >
            <Minus size={14} />
          </Button>

          <span className="text-sm font-medium">{quantity}</span>


          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => addToCart(id)}
            disabled={isAdding}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-50"
        onClick={() => deleteFromCart(id)}
        disabled={isDeleting}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
