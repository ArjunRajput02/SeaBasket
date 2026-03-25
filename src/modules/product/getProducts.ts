import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductById, buyNow, addReview } from "./productApi";

export const useProducts = (params?: {
  categoryId?: string;
  name?: string;
}) => {
  return useQuery({
    queryKey: ["products", params?.categoryId, params?.name],
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addReview"],
    mutationFn: addReview,
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });
    },
  });
};
