import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "@/modules/home/homePageApi";
import { decreaseFromCart } from "@/modules/product/productApi";
import { getCart } from "@/modules/order/cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => addProductToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDecreaseFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => decreaseFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
