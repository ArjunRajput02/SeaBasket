import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "./productType";
import { Star, Plus, Minus } from "lucide-react";

import { useAddToCart, useCart, useDecreaseFromCart } from "@/hooks/useAddtoCart";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const { data: cartData } = useCart();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: decreaseFromCart } = useDecreaseFromCart();

  const cartItems = cartData?.cart || [];

  const cartItem = cartItems.find(
    (item: any) => item.product_id === product.id,
  );

  return (
    <Card
      className="rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardContent className="p-3">
        <img
          src={product.images?.[0]?.image_url}
          alt={product.name}
          className="h-40 w-full object-contain"
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-green-600 font-semibold text-sm">
            ₹{product.price}
          </span>

          {!cartItem ? (
            <Button
              size="sm"
              className="bg-white text-pink-600 border border-pink-500 "
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product.id);
              }}
            >
              ADD
            </Button>
          ) : (
            <div
              className="flex items-center gap-2 border px-2 py-1 rounded"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => decreaseFromCart(product.id)}>
                <Minus size={14} />
              </button>

              <span>{cartItem.quantity}</span>

              <button onClick={() => addToCart(product.id)}>
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
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
        </div>
      </CardContent>
    </Card>
  );
}
