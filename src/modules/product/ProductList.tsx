import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Categories from "../home/Categories";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProduct";
import Filters from "./Filters";
import SortBar from "./SortBar";
import ProductCard from "./Product";
import type{ FiltersType, Product } from "./productType";
import { PackageX } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductList() {
  const [filters, setFilters] = useState<FiltersType>({
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    discount: undefined,
  });

  const [params] = useSearchParams();
  const categoryId = params.get("categoryId") ?? undefined;
  const name = params.get("name") ?? undefined;

  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedFilters = useDebounce(filters, 1000);
  const debouncedSort = useDebounce(sort, 1000);

  const { data } = useProducts({
    categoryId,
    name,
    minPrice: debouncedFilters.minPrice,
    maxPrice: debouncedFilters.maxPrice,
    minRating: debouncedFilters.rating,
    minDiscount: debouncedFilters.discount,
    sortBy:
      debouncedSort === "low" || debouncedSort === "high"
        ? "price"
        : debouncedSort === "name-asc"
          ? "rating"
          : debouncedSort === "name-dsc"
            ? "discount"
            : undefined,
    order:
      debouncedSort === "low"
        ? "ASC"
        : debouncedSort === "high"
          ? "DESC"
          :  debouncedSort=== "name-asc"
            ? "ASC"
            : debouncedSort === "name-dsc"
              ? "DESC"
              : undefined,
  });

  const products = data?.products || [];

  return (
    <>
      <Header />
      <Categories />

      <div className="p-3 md:p-6">
        <div className="flex justify-between items-center mb-3 md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="border px-3 py-1 rounded-md text-sm"
          >
            Filters
          </button>

          <SortBar setSort={setSort} />
        </div>

        <div className="flex gap-6">
          <div className="hidden md:block w-64">
            <Filters filters={filters} setFilters={setFilters} />
          </div>

          {showFilters && (
            <div className="absolute z-50 bg-white p-3 shadow-md rounded-md md:hidden w-[90%]">
              <Filters filters={filters} setFilters={setFilters} />
            </div>
          )}

          <div className="flex-1">
            <div className="hidden md:flex justify-end mb-3">
              <SortBar setSort={setSort} />
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <PackageX size={48} className="text-gray-400 mb-4" />
                <h2 className="text-lg font-semibold">No products found</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
