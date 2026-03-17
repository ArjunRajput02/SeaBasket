import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const getProducts = async (categoryId?: string) => {
  const res = await api.get("/products", {
    params: {
      categoryId,
    },
  });
  return res.data;
};
