import axios from "axios";
import { store } from "@/store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getCart = async () => {
  const token = store.getState().auth.sessionToken;
  const res = await api.get("/products/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const decleteFromCart = async (productId: number) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.delete(
    `/products/cart/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};