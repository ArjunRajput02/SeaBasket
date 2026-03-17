import { useQuery } from "@tanstack/react-query";
import { getCart } from "./cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
