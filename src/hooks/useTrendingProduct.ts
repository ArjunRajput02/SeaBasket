import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTrendingProducts,
  getCategories,
  getProfile,
  updateProfile,
} from "../modules/home/homePageApi";
import { toast } from "sonner";
import type { CategoriesResponse } from "@/modules/home/homeType";
import { getMyOrders, getOrderById } from "@/modules/order/cartApi";
import { useQueryClient } from "@tanstack/react-query";

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: () => getTrendingProducts(),
  });
};

export const useCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedData) => {
      toast.success("Profile updated successfully");
      queryClient.setQueryData(["profile"], updatedData);
    },
    onError: (error: any) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });
};

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["my-order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};
