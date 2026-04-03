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
  id:number;
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

export type ProductReviewsProps = {
  reviews: Review[];
  avgRating: number;
  productId: number;
  sessionToken: string | null;
  refetch: () => void;
};

export type ReviewListProps = {
  reviews: Review[];
  currentUserId?: number;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
}

export type ReviewFormProps = {
  productId: number;
  sessionToken: string | null;
  reviews: Review[];
  userId?: number;
  refetch: () => void;
  editingReview: Review | null;
  setEditingReview: React.Dispatch<React.SetStateAction<Review | null>>;
};