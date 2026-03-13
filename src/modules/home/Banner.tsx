import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const banners = [
  {
    title: "Fresh Fruits Delivered Daily",
    description: "Get farm fresh fruits delivered to your door.",
    image: "/fruits-banner.jpeg",
    bg: "bg-orange-100",
  },
  {
    title: "Healthy Snacks Collection",
    description: "Discover delicious and healthy snack options.",
    image: "/healthy-snacks-banner.jpeg",
    bg: "bg-yellow-100",
  },
  {
    title: "Organic Grocery Items",
    description: "Pure organic products for your healthy life.",
    image: "/groceries.jpg",
    bg: "bg-green-100",
  },
];

export default function Banner() {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full py-6">
      <Carousel
        setApi={setApi}
        className="w-full max-w-7xl mx-auto"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Card className={`${banner.bg} border-none rounded-3xl`}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-4 max-w-md">
                    <h2 className="text-4xl font-bold">{banner.title}</h2>
                    <p className="text-gray-600">{banner.description}</p>
                    <Button className="rounded-full">Shop Now</Button>
                  </div>
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-100 h-50"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
