import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTrendingProducts,
  getCategories,
  getProfile,
  updateProfile,
} from "../modules/home/homePageApi";
import { toast } from "sonner";
import type { CategoriesResponse} from "@/modules/home/homeType";

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
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });
};


