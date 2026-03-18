import { useParams } from "react-router-dom";
import { useProductbyId } from "./getProducts";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useProductbyId(id!);

  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 grid md:grid-cols-2 gap-10">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          {(product.images?.length
            ? product.images
            : [{ image_url: product.image }]
          ).map((img: any, index: number) => (
            <img
              key={index}
              src={img.image_url}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-20 object-cover rounded-md cursor-pointer border ${
                selectedImage === index ? "border-black" : "border-gray-200"
              }`}
            />
          ))}
        </div>


        <div className="relative flex-1">
          <img
            src={product.images?.[selectedImage]?.image_url || product.image}
            alt={product.name}
            className="rounded-xl w-full h-125 object-cover"
          />

        </div>
      </div>
    
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
          <p className="text-gray-500 text-sm mt-2">
            {product.category?.category_name}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500">{product.rating} rating</span>
        </div>

        <div className="text-2xl font-semibold">₹{product.price}</div>

        <div className="flex gap-4">
          <Button className="flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button variant="secondary" className="flex-1">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
