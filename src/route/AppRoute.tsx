import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductList from "../pages/ProductList";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import ProfilePage from "../pages/ProfilePage";
import OrderDetails from "../pages/OrderDetails";
import Cart from "../pages/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/order" element={<OrderDetails />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
