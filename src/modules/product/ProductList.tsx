import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Categories from "../home/Categories";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "./getProducts";
import Filters from "./Filters";
import SortBar from "./SortBar";
import ProductCard from "./Product";
import type { Product } from "./productType";
import { PackageX } from "lucide-react";

export default function ProductList() {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
    discount: 0,
  });

  const [params] = useSearchParams();
  const categoryId = params.get("categoryId") ?? undefined;
  const name = params.get("name") ?? undefined;

  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data } = useProducts({ categoryId, name });

  const products = data?.products || [];

  const filteredProducts = products
    .filter(
      (p: Product) =>
        p.price >= filters.minPrice && p.price <= filters.maxPrice,
    )
    .filter((p: Product) => p.rating >= filters.rating)
    .filter((p: Product) => p.discount >= filters.discount)
    .sort((a: Product, b: Product) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "name-asc") return b.rating - a.rating;
      if (sort === "name-dsc") return b.discount - a.discount;
      return 0;
    });

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

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product: Product) => (
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
