import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Categories from "../home/Categories";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "./getProducts";
import Filters from "./Filters";
import SortBar from "./SortBar";
import ProductCard from "./Product";

export default function ProductList() {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: Infinity,
    rating: 0,
    discount: 0,
  });
  const [params] = useSearchParams();
  const categoryId = params.get("categoryId");
  const [sort, setSort] = useState("");
  const { data } = useProducts(categoryId || undefined);

  const products = data?.products || [];

  const filteredProducts = products
    .filter((p) => p.price >= filters.minPrice)
    .filter((p) => p.price <= filters.maxPrice)
    .filter((p) => p.rating >= filters.rating)
    .filter((p) => p.discount >= filters.discount);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });
  return (
    <>
      <Header />
      <Categories />

      <div className="flex gap-6 p-6">
        <div className="w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <div className="w-3/4">
          <SortBar setSort={setSort} />

          <div className="grid grid-cols-3 gap-4 mt-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
