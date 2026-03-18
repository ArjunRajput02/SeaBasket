import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "./productApi";

export const useProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProducts(categoryId),
  });
};

export const useProductbyId = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
