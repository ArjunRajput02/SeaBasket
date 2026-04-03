export type CartItemProps = {
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type ProductImage = {
  image_url: string;
};

export type Product = {
  name: string;
  price: number | string;
  images: ProductImage[];
};

export type CartItemType = {
  id: string | number;
  quantity: number;
  product: Product;
};

export type CartResponse = {
  cart: CartItemType[];
};

export type PaymentState = {
  clientSecret: string;
} | null;

export type CheckoutPayload = {
  addressId: number;
  isSingle: boolean;
  productId?: number;
  paymentMode: string;
};

export type CheckoutResponse = {
  client_secret?: string;
  message?: string;
};
