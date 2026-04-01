import { useMutation, useQuery } from "@tanstack/react-query";
import { getProducts, getProductById, buyNow, addReview } from "./productApi";
import type { ProductParams } from "./productType";
import { updateReview, deleteReview } from "./productApi";
import { useQueryClient } from "@tanstack/react-query";

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

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateReview"],
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteReview"],
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
    },
  });
};