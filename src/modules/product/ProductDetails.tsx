import { useParams } from "react-router-dom";
import { useBuyNow, useProductbyId } from "./getProducts";
import { Star, ShoppingCart, Zap, Package } from "lucide-react";
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { review } from "./productType";
import { useAddToCart, useDecreaseFromCart } from "@/hooks/useAddtoCart";
import { useCart } from "@/hooks/useAddtoCart";
import { Plus, Minus } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCart as addToCartRedux } from "@/store/slice/cartSlice";
import { decreaseFromCart as decreaseFromCartRedux } from "@/store/slice/cartSlice";

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

    if (sessionToken) {
      dispatch(addToCartRedux(product.id));
    } else {
      addToCartMutation.mutate(product.id);
    }
  };

const handleDecrease = () => {
  if (!product?.id) 
    return;

  if (sessionToken) {
    dispatch(decreaseFromCartRedux(product.id));
  } else {
    decreaseFromCartMutation.mutate(product.id);
  }
};

  const handleBuyNow = () => {
    if (!product?.id) 
      return;

    if (!sessionToken) {
      navigate("/login");
      return;
    }

    buyProduct.mutate(product.id.toString(), {
      onSuccess: (data) => {
        const url = data?.checkout_url || data?.url;
        window.location.href = url;
      },
      onError: () => {
        toast.error("Failed to Add to Cart");
      },
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="h-1 w-full bg-amber-500" />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 mb-10 text-xs text-gray-400 uppercase tracking-widest">
            <span>Shop</span>
            <span>/</span>
            <span>{product?.category?.category_name}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 pt-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-18 h-22 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-amber-500 shadow-md scale-105"
                        : "border-transparent opacity-60 hover:opacity-90 hover:border-amber-200"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative group rounded-xl overflow-hidden bg-gray-100 shadow">
                <img
                  src={images[selectedImage]?.image_url || ""}
                  alt={product?.name || ""}
                  className="w-full h-130 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between py-2">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-wide text-amber-600 font-medium border border-amber-200 px-3 py-1 rounded-full bg-amber-50">
                  {product?.category?.category_name}
                </span>

                <h1 className="text-3xl font-semibold text-gray-900">
                  {product?.name || "Loading..."}
                </h1>

                {product?.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 transition-colors ${
                          star <= Math.round(avgRating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product?.reviews?.length
                      ? avgRating.toFixed(1)
                      : product?.rating
                        ? parseFloat(product.rating).toFixed(1)
                        : "No ratings yet"}
                  </span>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">
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
                    disabled={addToCartMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2">
                    <button
                      onClick={handleDecrease}
                      disabled={decreaseFromCartMutation.isPending}
                      className="p-2 bg-white rounded-md shadow hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-lg">{quantity}</span>

                    <button
                      onClick={handleAddToCart}
                      disabled={addToCartMutation.isPending}
                      className="p-2 bg-white rounded-md shadow hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleBuyNow}
                  disabled={buyProduct.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition disabled:opacity-60"
                >
                  <Zap className="w-4 h-4" />
                  {buyProduct.isPending ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Customer Reviews
              </h2>

              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 transition-colors ${
                      star <= Math.round(avgRating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-200 mb-8" />

            {(!product?.reviews || product.reviews.length === 0) && (
              <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
                <p className="text-gray-500 font-medium">No reviews yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Be the first to share your experience
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              {product?.reviews?.map((review: review, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <p className="font-semibold text-gray-900 text-sm">
                      {review.user?.first_name || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= review.rating
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    className="text-5xl leading-none text-gray-200 font-serif mb-1 -mt-1"
                    aria-hidden
                  >
                    "
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment || "No comment provided."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <p className="text-gray-500 text-lg">Loading product...</p>
        </div>
      )}

      <Footer />
    </>
  );
}
