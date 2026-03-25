export type CartItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  finalPrice: number;
};
export type cartItem = CartItemProps[]