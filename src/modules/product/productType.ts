export type ProductImage = {
  image_url: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  discount: number;
  images: ProductImage[];
  final_price: number;
};

export type SortBarProps = {
  setSort: (val: string) => void;
};

export type FiltersType = {
  minPrice: number;
  maxPrice: number;
  rating: number;
  discount: number;
};
export type FilterTypeProps = {
  filters: FiltersType;
  setFilters: (val: FiltersType) => void;
};
export type User = {
  first_name: string;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  user?: User;
};
