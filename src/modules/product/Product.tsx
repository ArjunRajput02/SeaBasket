import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "./productType";
import { Star, Plus, Minus, IndianRupee } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import {
  useAddToCart,
  useCart,
  useDecreaseFromCart,
} from "@/hooks/useAddtoCart";

import { addToCart, decreaseFromCart } from "@/store/slice/cartSlice";
import type { CartItem } from "@/utils/types";
export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: cartData } = useCart();
  const { mutate: mutateAdd } = useAddToCart();
  const { mutate: mutateDecrease } = useDecreaseFromCart();

  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );

  const localCart = useSelector((state: RootState) => state.cart.items);

  const cartItems = sessionToken ? cartData?.cart || [] : localCart;

  const cartItem = cartItems.find(
    (item: CartItem) => item.product_id === product.id || item.id === product.id,
  );

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (sessionToken) {
      mutateAdd(product.id);
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.images?.[0]?.image_url,
          discount: Number(product.discount),
          finalPrice: Number(product.finalPrice),
        }),
      );
    }
  };

  const handleDecrease = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (sessionToken) {
      mutateDecrease(product.id);
    } else {
      dispatch(decreaseFromCart(product.id));
    }
  };

  const price = Number(product.price);
  const discount = Number(product.discount);
  const finalPrice = Number(product.finalPrice);

  return (
    <Card
      className="rounded-xl overflow-hidden hover:shadow-lg transition "
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardContent className="p-3">
        <img
          src={product.images?.[0]?.image_url}
          alt={product.name}
          className="h-40 w-full object-contain"
        />

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-green-600 font-semibold text-sm">
                <IndianRupee size={14} />
                <span>{finalPrice.toFixed(0)}</span>
              </div>

              <div className="flex items-center text-gray-400 text-xs line-through">
                <IndianRupee size={12} />
                <span>{price.toFixed(0)}</span>
              </div>
            </div>

            {discount > 0 && (
              <span className="text-xs text-green-600 font-medium">
                {discount}% OFF
              </span>
            )}
          </div>

          {!cartItem ? (
            <Button
              size="sm"
              className="bg-white text-pink-600 border border-pink-500 cursor-pointer hover:bg-pink-100"
              onClick={handleAdd}
            >
              ADD
            </Button>
          ) : (
            <div
              className="flex items-center gap-2 border px-2 py-1 rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleDecrease} className="cursor-pointer">
                <Minus size={14} />
              </button>

              <span>{cartItem.quantity}</span>

              <button onClick={handleAdd} className="cursor-pointer">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm mt-2 line-clamp-2 text-gray-700">
          {product.name}
        </p>

        <div className="flex items-center mt-1 gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={
                star <= Math.round(product.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-black-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
        </div>
      </CardContent>
    </Card>
  );
}
