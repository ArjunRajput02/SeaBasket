import axios from "axios";
import { store } from "@/store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getProducts = async (categoryId?: string) => {
  const res = await api.get("/products", {
    params: {
      categoryId,
    },
  });
  return res.data;
};

export const decreaseFromCart = async (productId: number) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.put(
    `/products/cart/${productId}`,
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
