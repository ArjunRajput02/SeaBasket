import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEPS, STATUS_INDEX } from "@/utils/constants";

export default function OrderStepper({ status }: { status: string }) {
  const current = STATUS_INDEX[status] ?? 0;

  return (
    <div className="flex items-start w-full gap-0">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const pending = i > current;

        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center relative"
          >
            {i < STEPS.length - 1 && (
              <div className="absolute left-1/2 top-4 w-full h-[2px] -z-0">
                <div
                  className={cn(
                    "h-full",
                    done ? "bg-emerald-400" : "bg-gray-200",
                  )}
                />
              </div>
            )}

            <div
              className={cn(
                "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2",
                done && "bg-emerald-500 text-white",
                active && "bg-white ring-indigo-400 text-indigo-600",
                pending && "bg-gray-100 text-gray-400",
              )}
            >
              {done ? <Check className="w-4 h-4" /> : i + 1}
            </div>

            <span className="mt-1.5 text-[10px] text-center">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
