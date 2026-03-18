import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useTrendingProducts } from "../../hooks/useTrendingProduct";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slice/cartSlice";
import type { RootState } from "@/store/store";
import { useAddToCart } from "../../hooks/useTrendingProduct";
import type { CarouselApi } from "@/components/ui/carousel";
import type { Product } from "./homeType";

export default function TrendingCarousel() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const { data } = useTrendingProducts();
  const { mutate: addToCartApi } = useAddToCart();
  const dispatch = useDispatch();
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );

  React.useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api]);

  const handleAddToCart = async (product: Product) => {
    try {
      if (sessionToken) {
        addToCartApi(product.id);
      } else {
        dispatch(
          addToCart({
            id: product.id,
            quantity: 1,
          }),
        );
      }
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 font-sans">Trending Products</h2>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {data?.products?.map((product: Product) => (
            <CarouselItem
              key={product.id}
              className="basis-[70%] sm:basis-[40%] md:basis-[25%] lg:basis-[20%]"
            >
              <Card className="rounded-xl overflow-hidden hover:shadow-lg transition">
                <CardContent className="p-3">
                  <img
                    src={product.images?.[0]?.image_url}
                    alt={product.name}
                    className="h-40 w-full object-contain"
                  />

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-green-600 font-semibold text-sm font-poppins">
                      ₹{product.price}
                    </span>

                    <Button
                      size="sm"
                      className="bg-white text-pink-600 border border-pink-500 hover:bg-pink-50"
                      onClick={() => handleAddToCart(product)}
                    >
                      ADD
                    </Button>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2 text-gray-700">
                    {product.name}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
