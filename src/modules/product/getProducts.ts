import { useMutation, useQuery } from "@tanstack/react-query";
import { getProducts, getProductById, buyNow, addReview } from "./productApi";
import type { ProductParams } from "./productType";

export const useProducts = (params?: ProductParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};

export const useProductbyId = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useBuyNow = () => {
  return useMutation({
    mutationKey: ["buy"],
    mutationFn: (id: string) => buyNow(id),
  });
};

export const useAddReview = () => {
  return useMutation({
    mutationKey: ["addReview"],
    mutationFn: addReview,
  });
};
