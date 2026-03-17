"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const banners = [
  {
    title: "Fresh Fruits\nDelivered Daily",
    description:
      "Get farm-fresh fruits delivered straight to your door — picked at peak ripeness.",
    image: "/fruits-banner.jpeg",
    bg: "from-orange-50 via-orange-100 to-amber-200",
    glow: "from-orange-400/20 to-transparent",
    eyebrow: "Fresh Picks",
    eyebrowColor: "bg-orange-100 text-orange-700",
  },
  {
    eyebrow: "New Arrivals",
    title: "Healthy Snacks\nCollection",
    description:
      "Discover delicious, guilt-free snack options crafted for your wellness goals.",
    image: "/healthy-snacks-banner.jpeg",
    bg: "from-yellow-50 via-yellow-100 to-yellow-200",
    glow: "from-yellow-400/20 to-transparent",
    eyebrowColor: "bg-yellow-100 text-yellow-700",
  },
  {
    eyebrow: "100% Organic",
    title: "Organic Grocery\nItems",
    description:
      "Pure organic products, carefully sourced for your healthy, sustainable lifestyle.",
    image: "/groceries.jpg",
    bg: "from-green-50 via-green-100 to-green-200",
    glow: "from-green-400/20 to-transparent",
    eyebrowColor: "bg-green-100 text-green-700",
  },
];

export default function Banner() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!api || isHovered) return;

    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      if (intervalRef.current) 
        {
          clearInterval(intervalRef.current);
        }
    };
  }, [api, isHovered]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Card
                className={`bg-gradient-to-br ${banner.bg} border-none rounded-none sm:rounded-3xl overflow-hidden`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-10 relative min-h-[220px] sm:min-h-[300px]">
                  <div
                    className={`absolute inset-y-0 right-0 w-full sm:w-1/2 bg-gradient-to-l ${banner.glow} pointer-events-none`}
                  />

                  <div className="relative z-10 space-y-3 max-w-xl">
                    <span
                      className={`inline-block text-[10px] sm:text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full ${banner.eyebrowColor}`}
                    >
                      {banner.eyebrow}
                    </span>

                    <h2 className="text-2xl sm:text-4xl font-semibold text-gray-900 whitespace-pre-line">
                      {banner.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {banner.description}
                    </p>
                  </div>
                  <div className="relative z-10 mt-6 sm:mt-0 sm:pr-8 hidden sm:block">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className={`w-56 h-44 object-cover rounded-2xl shadow-lg transition-all duration-500 ${
                        current === index ? "scale-105" : "scale-95 opacity-80"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
