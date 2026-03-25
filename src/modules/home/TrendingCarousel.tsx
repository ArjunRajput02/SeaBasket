import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTrendingProducts } from "../../hooks/useTrendingProduct";
import type { CarouselApi } from "@/components/ui/carousel";
import ProductCard from "../product/Product";
import type { Product } from "../product/productType";

export default function TrendingCarousel() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const { data } = useTrendingProducts();

  React.useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api]);

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
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
