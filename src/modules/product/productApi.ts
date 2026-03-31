import axios from "axios";
import { store } from "@/store/store";
import type { ProductParams } from "./productType";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getProducts = async (params?: ProductParams) => {
  const res = await api.get("/products", {
    params,
  });
  return res.data;
};

export const decreaseFromCart = async (productId: number) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.put(
    `/cart/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data.product;
};

export const buyNow = async (id: string) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.post(
    `/orders/buy-now/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const addReview = async ({
  productId,
  rating,
  comment,
}: {
  productId: string;
  rating: number;
  comment: string;
}) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.post(
    `/products/review/${productId}`,
    { rating, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
