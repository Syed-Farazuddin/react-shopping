import "./App.css";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/Login";
import RegisterPage from "./components/register/Register";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import Profile from "./components/profilePage/Profile";
import UpdateProfile from "./components/profilePage/UpdateProfile";
import NewPassword from "./components/updatePassword/NewPassword";
import AdminDashboard from "./components/Admin/AdminDashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/cart" element={<CartList />} />
        <Route path="/admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<NewPassword />} />
      </Routes>
    </>
  );
}

export default App;
