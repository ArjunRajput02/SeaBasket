import { Routes, Route } from "react-router-dom";
import HomePage from "../modules/home/HomePage";
import ProductList from "../modules/product/ProductList";
import Login from "../modules/auth/Login";
import ProductDetails from "../modules/product/ProductDetails";
import ProfilePage from "../modules/home/ProfilePage";
import OrderDetails from "../modules/order/OrderDetails";
import Cart from "../modules/order/Cart";
import Registration from "@/modules/auth/Registration";
import OtpVerification from "@/modules/auth/OtpVerification";

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
      <Route path="/registration" element={<Registration />} />
      <Route path="/verification" element={<OtpVerification />} />
    </Routes>
  );
};

export default AppRoutes;
