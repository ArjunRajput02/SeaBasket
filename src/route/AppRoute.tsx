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
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Navigate } from "react-router-dom";
import ForgotPassword from "@/modules/auth/ForgotPassword";
import ResetPassword from "@/modules/auth/ResetPassword";
import CheckoutPage from "@/modules/order/Checkout";

const AppRoutes = () => {
  const token = useSelector<RootState>((state) => state.auth.token);
  const sessionToken = useSelector<RootState>(
    (state) => state.auth.sessionToken,
  );
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/order" element={<OrderDetails />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />
      {/* <Route
        path="/verification"
        element={
          token && !sessionToken ? (
            <OtpVerification />
          ) : !token && !sessionToken ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/" />
          )
        }
        /> */}
      <Route
        path="/verification"
        element={
          token && !sessionToken ? (
            <OtpVerification />
          ) : !token && !sessionToken ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
