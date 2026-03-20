export type CarouselApi = {
  scrollNext: () => void;
};
type ProductImage = {
  image_url?: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  images?: ProductImage[];
};

export type Category = {
  id: string | number;
  category_name: string;
};

export type CategoriesResponse = {
  categories: Category[];
};

export type ProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};
