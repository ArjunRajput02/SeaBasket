import axios from "axios";

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
