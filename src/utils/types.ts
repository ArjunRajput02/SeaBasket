import type { ReactNode } from "react";

export type FormErrorProps = {
  message?: string;
};
export type AuthState = {
  token: string | null;
  sessionToken: string | null;
};
export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type CartItem = {
  product_id?: number;
  id?: number;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
  discount?: number;
  finalPrice?: number;
};

export type CartState = {
  items: CartItem[];
};

export type RouteProps = {
  children: ReactNode;
};
