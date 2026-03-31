import axios from "axios";
import { store } from "@/store/store";
import type { ProfileForm } from "./homeType";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getTrendingProducts = async () => {
  const res = await api.get("/products", {
    params: {
      isTrending: 1,
    },
  });

  return res.data;
};
export const getCategories = async () => {
  const res = await api.get("/products/categories");
  return res.data;
};

export const getProfile = async () => {
  const token = store.getState().auth.sessionToken;
  const res = await api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfile = async (payload: ProfileForm) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.put("/users/user", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addProductToCart = async (productId: number) => {
  const token = store.getState().auth.sessionToken;

  const res = await api.post(
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

export const getOrders = async () => {
  const token = store.getState().auth.sessionToken;
  const response = await api.get("/orders/my-orders/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
