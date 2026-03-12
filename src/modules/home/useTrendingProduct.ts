import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts } from "./trendingProductsApi";

export const useTrendingProducts = () => {
  return useQuery({
    queryKey: ["trending-products"],
    queryFn: getTrendingProducts,
  });
};