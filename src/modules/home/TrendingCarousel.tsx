import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useTrendingProducts } from "./useTrendingProduct";

export default function TrendingCarousel() {
  const [api, setApi] = React.useState<any>();
  const { data } = useTrendingProducts();

  React.useEffect(() => {
    if (!api) return;

    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api]);

  return (
    <section className="py-20 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12">Trending Items</h2>

      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          dragFree: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-6">
          {data?.products?.map((products) => (
            <CarouselItem
              key={products.id}
              className="pl-6 basis-[70%] sm:basis-[45%] md:basis-[35%] lg:basis-[25%]"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden rounded-2xl shadow-xl border-none group cursor-pointer">
                  <CardContent className="p-0 relative">
                    <img
                      src={products.images?.[0]?.image_url}
                      alt={products.name}
                      className="h-50 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
