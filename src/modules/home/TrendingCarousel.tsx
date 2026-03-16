import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useTrendingProducts } from "./useTrendingProduct";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type CarouselApi = {
  scrollNext: () => void;
};

export default function TrendingCarousel() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const { data } = useTrendingProducts();
  const sessionToken = useSelector(
    (state: RootState) => state.auth.sessionToken,
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api]);

  const handleAddToCart = (product: any) => {
    if (!sessionToken) {
      toast.error("You have to login to add items to cart");
      navigate("/login");
      return;
    }

    console.log("Add to cart", product);

    // later you can call API here
    // await addToCartApi(product.id)
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
          {data?.products?.map((product) => (
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
