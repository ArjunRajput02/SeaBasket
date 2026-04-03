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
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "../modules/home/homePageApi";
import type { AxiosError } from "axios";

type ApiError = {
  message: string;
};

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
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error: AxiosError<ApiError>) => {
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

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success("Address added successfully ");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(`Failed to add address: ${error.message}`);
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      toast.success("Address deleted ");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message = error?.response?.data?.message;
      toast.error(`Delete failed: ${message}`);
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      toast.success("Address updated ");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: AxiosError<ApiError>) => {
      const message = error?.response?.data?.message;
      toast.error(`Update failed: ${message}`);
    },
  });
};
