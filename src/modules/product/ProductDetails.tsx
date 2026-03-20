import { useParams, useNavigate } from "react-router-dom";
import { useBuyNow, useProductbyId } from "./getProducts";
import { Star, ShoppingCart, Zap, Package, Plus, Minus } from "lucide-react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  useAddToCart,
  useDecreaseFromCart,
  useCart,
} from "@/hooks/useAddtoCart";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { toast } from "sonner";
import {
  addToCart as addToCartRedux,
  decreaseFromCart as decreaseFromCartRedux,
} from "@/store/slice/cartSlice";
import ProductReviews from "./ProductReview";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useProductbyId(id!);

  const [selectedImage, setSelectedImage] = useState(0);

  const { data: cart } = useCart();
  const addToCartMutation = useAddToCart();
  const decreaseFromCartMutation = useDecreaseFromCart();

  const navigate = useNavigate();
  const buyProduct = useBuyNow();
  const dispatch = useDispatch();

  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );

  const avgRating = product?.reviews?.length
    ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
      product.reviews.length
    : parseFloat(product?.rating || "0");

  const images = product?.images?.length
    ? product.images
    : product?.image
      ? [{ image_url: product.image }]
      : [];

  const cartItem = cart?.cart?.find(
    (item: any) => item.product_id === product?.id,
  );

  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!product?.id) return;

    if (!sessionToken) {
      dispatch(
        addToCartRedux({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.image_url,
        }),
      );
    } else {
      addToCartMutation.mutate(product.id);
    }
  };

  const handleDecrease = () => {
    if (!product?.id) return;

    if (!sessionToken) {
      dispatch(decreaseFromCartRedux(product.id));
    } else {
      decreaseFromCartMutation.mutate(product.id);
    }
  };

  const handleBuyNow = () => {
    if (!product?.id) return;

    if (!sessionToken) {
      navigate("/login");
      return;
    }

    buyProduct.mutate(product.id.toString(), {
      onSuccess: (data) => {
        const url = data?.checkout_url || data?.url;
        window.location.href = url;
      },
      onError: () => toast.error("Failed to process"),
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="h-1 w-full bg-amber-500" />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex gap-2 mb-10 text-xs text-gray-400 uppercase">
            <span>Shop</span>
            <span>/</span>
            <span>{product?.category?.category_name}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                {images.map((img: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-18 h-22 rounded-xl overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-amber-500"
                        : "opacity-60"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={images[selectedImage]?.image_url || ""}
                  className="w-full h-130 object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <span className="text-xs text-amber-600 border px-3 py-1 rounded-full w-fit">
                  {product?.category?.category_name}
                </span>

                <h1 className="text-3xl font-semibold">{product?.name}</h1>

                <p className="text-gray-600 text-sm">{product?.description}</p>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(avgRating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500">
                    {avgRating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">
                    {product?.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                {quantity === 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="bg-black text-white py-3 rounded-lg flex justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
                    <button onClick={handleDecrease}>
                      <Minus />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleAddToCart}>
                      <Plus />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleBuyNow}
                  className="bg-amber-500 text-white py-3 rounded-lg flex justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <ProductReviews
            reviews={product?.reviews}
            avgRating={avgRating}
            productId={product?.id}
            sessionToken={sessionToken}
          />
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/70">
          Loading...
        </div>
      )}

      <Footer />
    </>
  );
}
