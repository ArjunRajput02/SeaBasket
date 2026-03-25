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

export default function ProductList() {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
    discount: 0,
  });

  const [params] = useSearchParams();
  const categoryId = params.get("categoryId");
  const name = params.get("name") ?? undefined;

  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data } = useProducts({ categoryId, name });

  const products = data?.products || [];

  const filteredProducts = products
    .filter((p: Product) =>
      filters.minPrice ? p.final_price >= filters.minPrice : true,
    )
    .filter((p: Product) =>
      filters.maxPrice && filters.maxPrice !== Infinity
        ? p.final_price <= filters.maxPrice
        : true,
    )
    .filter((p: Product) =>
      filters.rating ? p.rating >= filters.rating : true,
    )
    .filter((p: Product) =>
      filters.discount ? p.discount >= filters.discount : true,
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.final_price);
    const priceB = Number(b.final_price);

    if (sort === "low") return priceA - priceB;
    if (sort === "high") return priceB - priceA;
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

            <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
