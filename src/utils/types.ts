export type FormErrorProps = {
  message?: string;
};
export type AuthState = {
  token: string | null;
  sessionToken: string | null;
}
export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export type CartState ={
  items: CartItem[];
}
