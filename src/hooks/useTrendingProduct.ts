import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTrendingProducts,
  getCategories,
  getProfile,
  updateProfile,
  addProductToCart,
} from "../modules/home/homePageApi";

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: () => getTrendingProducts(),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (productId: number) => addProductToCart(productId),
  });
};
