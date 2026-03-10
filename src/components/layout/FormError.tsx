import type{ FormErrorProps } from "@/utils/types";

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}
