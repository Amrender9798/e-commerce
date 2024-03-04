import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ProductForm from "./Pages/ProductForm";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import ProtectedRoute from "./ProtectedRoute";
import CheckOut from "./Pages/CheckOut";
import YourComponent from "./Components/YourComponent";
import ResetPassword from "./Pages/ResetPassword";
import SetPassword from "./Pages/SetPassword";
import OrderSuccess from "./Pages/OrderSuccess";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/form" element={<ProductForm />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/order" element={<ProtectedRoute element={<Order />} />} />
        <Route path="/checkout" element={<ProtectedRoute element={<CheckOut />} />} />
        <Route path="/test" element={<YourComponent/>}/> 
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/set-password" element={<SetPassword/>}/>
        <Route path="/success" element={<OrderSuccess/>}/>
      </Routes>
    </div>
  );
}

export default App;
