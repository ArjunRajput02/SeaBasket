export type CarouselApi = {
  scrollNext: () => void;
};
type ProductImage = {
  image_url: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  images?: ProductImage[];
};