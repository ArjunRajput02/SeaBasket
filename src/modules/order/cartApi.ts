import axios from "axios";
import { store } from "@/store/store";
import type { CheckoutPayload, CheckoutResponse } from "./cartType";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const getCart = async () => {
  const token = store.getState().auth.sessionToken;
  const res = await api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const decleteFromCart = async (productId: number) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.delete(`/cart/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postCheckout = async (
  payload: CheckoutPayload,
): Promise<CheckoutResponse> => {
  const token = store.getState().auth.sessionToken;
  const res = await api.post("/orders/checkout", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getMyOrders = async () => {
  const token = store.getState().auth.sessionToken;
  const res = await api.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const token = store.getState().auth.sessionToken;
  const res = await api.get(`/orders/my-order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
