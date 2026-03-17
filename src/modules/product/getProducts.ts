import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./productApi";

export const useProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProducts(categoryId),
  });
};