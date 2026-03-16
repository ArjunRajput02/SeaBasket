import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts,getCategories } from "./trendingProductsApi";

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
