export const STEPS = ["Pending", "Confirmed", "Shipped", "Delivered"];

export const STATUS_INDEX: Record<string, number> = {
  PLACED: 0,
  SUCCESS: 1,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
};

export const STATUS_STYLE: Record<string, { dot: string; badge: string }> = {
  PENDING: {
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  SUCCESS: { dot: "bg-sky-400", badge: "bg-sky-50 text-sky-700 ring-sky-200" },
  CONFIRMED: {
    dot: "bg-sky-400",
    badge: "bg-sky-50 text-sky-700 ring-sky-200",
  },
  SHIPPED: {
    dot: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 ring-violet-200",
  },
  DELIVERED: {
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};
 export const banners = [
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