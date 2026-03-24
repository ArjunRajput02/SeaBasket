import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "@/modules/home/homePageApi";
import { decreaseFromCart } from "@/modules/product/productApi";
import { decleteFromCart, getCart } from "@/modules/order/cartApi";
import { toast } from "sonner";
import { postCheckout } from "@/modules/order/cartApi";


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

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => decleteFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: postCheckout,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Checkout failed.");
    },
  });
};
