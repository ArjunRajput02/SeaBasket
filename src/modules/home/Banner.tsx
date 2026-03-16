"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    title: "Fresh Fruits\nDelivered Daily",
    description:
      "Get farm-fresh fruits delivered straight to your door — picked at peak ripeness.",
    image: "/fruits-banner.jpeg",
    bg: "from-orange-50 via-orange-100 to-amber-200",
    glow: "from-orange-400/20 to-transparent",
    eyebrowColor: "bg-orange-100 text-orange-700",
    btnColor: "bg-orange-600 hover:bg-orange-700 text-white",
    dotActive: "bg-orange-600",
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
    btnColor: "bg-yellow-600 hover:bg-yellow-700 text-white",
    dotActive: "bg-yellow-600",
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
    btnColor: "bg-green-700 hover:bg-green-800 text-white",
    dotActive: "bg-green-700",
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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, isHovered]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full py-6">
      <Carousel
        setApi={setApi}
        className="w-full max-w-5xl mx-auto banner-body"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Card
                className={`bg-gradient-to-br ${banner.bg} border-none rounded-3xl overflow-hidden`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CardContent className="flex items-center justify-between p-0 relative min-h-[220px]">
                  <div
                    className={`absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l ${banner.glow} pointer-events-none`}
                  />

                  <div className="relative z-10 space-y-3 max-w-sm pl-10 py-10 pr-4">
                    <span
                      className={`inline-block text-[11px] font-medium tracking-widest uppercase px-3 py-1 rounded-full ${banner.eyebrowColor}`}
                    >
                      {banner.eyebrow}
                    </span>

                    <h2 className="banner-title text-4xl text-gray-900">
                      {banner.title}
                    </h2>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {banner.description}
                    </p>

                    <Button
                      className={`shop-btn rounded-full px-6 py-2 text-sm font-medium shadow-md ${banner.btnColor} flex items-center gap-2`}
                    >
                      Shop Now
                    </Button>
                  </div>

                  <div className="relative z-10 pr-8 py-6 flex-shrink-0">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className={`banner-img w-52 h-44 object-cover rounded-2xl shadow-lg ${
                        current === index ? "active" : ""
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center items-center gap-2 mt-4">
        {banners.map((banner, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`dot-pill h-2 rounded-full border-none cursor-pointer ${
              current === index ? `w-6 ${banner.dotActive}` : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
