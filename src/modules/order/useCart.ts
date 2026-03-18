import { useQuery } from "@tanstack/react-query";
import { getCart } from "./cartApi";
import type { CartResponse } from "./cartType";

export const useCart = () => {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
