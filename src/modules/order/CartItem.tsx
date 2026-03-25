import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, IndianRupee } from "lucide-react";
import type { CartItemProps } from "./cartTypes";
import {
  useAddToCart,
  useDecreaseFromCart,
  useDeleteFromCart,
} from "@/hooks/useAddtoCart";
import { useDispatch } from "react-redux";
import {
  addToCart as addToCartRedux,
  decreaseFromCart as decreaseRedux,
  removeFromCart,
} from "@/store/slice/cartSlice";

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  isLoggedIn,
}: CartItemProps & { isLoggedIn: boolean }) {
  const dispatch = useDispatch();

  const { mutate: addToCartAPI, isPending: isAdding } = useAddToCart();
  const { mutate: decreaseAPI, isPending: isDecreasing } =
    useDecreaseFromCart();
  const { mutate: deleteAPI, isPending: isDeleting } = useDeleteFromCart();

  const handleIncrease = () => {
    if (isLoggedIn) {
      addToCartAPI(id);
    } else {
      dispatch(addToCartRedux({ id, name, price, image }));
    }
  };

  const handleDecrease = () => {
    if (isLoggedIn) {
      decreaseAPI(id);
    } else {
      dispatch(decreaseRedux(id));
    }
  };

  const handleDelete = () => {
    if (isLoggedIn) {
      deleteAPI(id);
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex-1">
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {name}
        </h2>

        <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
          <IndianRupee size={14} />
          <span>{price}</span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={handleDecrease}
            disabled={isLoggedIn ? isDecreasing : false}
          >
            <Minus size={14} />
          </Button>

          <span className="text-sm font-medium">{quantity}</span>

          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={handleIncrease}
            disabled={isLoggedIn ? isAdding : false}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>

      {/* Delete */}
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-50"
        onClick={handleDelete}
        disabled={isLoggedIn ? isDeleting : false}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
}
