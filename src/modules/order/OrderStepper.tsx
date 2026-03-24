import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Step = {
  label: string;
  value: string;
};

const steps: Step[] = [
  { label: "Placed", value: "placed" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

const statusMap: Record<string, string> = {
  PENDING: "placed",
  SUCCESS: "confirmed",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
};

export default function OrderStepper({ status }: { status: string }) {
  const mappedStatus = statusMap[status] || "placed";

  const currentStep = steps.findIndex(
    (s) => s.value === mappedStatus.toLowerCase()
  );

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.value} className="flex-1 flex items-center">
            <div className="flex flex-col items-center w-full">
              <div
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-full border text-xs font-medium transition",
                  isCompleted && "bg-primary text-white border-primary",
                  isCurrent && "border-primary text-primary",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>

              <span className="text-[11px] mt-1 text-center">
                {step.label}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] flex-1 mx-1 transition",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}