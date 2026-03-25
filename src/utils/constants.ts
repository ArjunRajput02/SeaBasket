export const STEPS = ["Placed", "Confirmed", "Shipped", "Delivered"];

export const STATUS_INDEX: Record<string, number> = {
  PENDING: 0,
  SUCCESS: 1,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
};

export const STATUS_STYLE: Record<string, { dot: string; badge: string }> = {
  PENDING:   { dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-700 ring-amber-200" },
  SUCCESS:   { dot: "bg-sky-400",    badge: "bg-sky-50 text-sky-700 ring-sky-200" },
  CONFIRMED: { dot: "bg-sky-400",    badge: "bg-sky-50 text-sky-700 ring-sky-200" },
  SHIPPED:   { dot: "bg-violet-500", badge: "bg-violet-50 text-violet-700 ring-violet-200" },
  DELIVERED: { dot: "bg-emerald-500",badge: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};