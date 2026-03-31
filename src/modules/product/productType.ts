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
  finalPrice: number;
};

export type SortBarProps = {
  setSort: (val: string) => void;
};

export type FiltersType = {
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  discount?: number;
};
export type FilterTypeProps = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
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

export type ProductParams = {
  categoryId?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
};