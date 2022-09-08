import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Product from "./Product";
import Signup from "./Signup";
import Signin from "./Signin";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import AdminEditProduct from "./AdminEditProduct";
import NotFound from "./NotFound";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/cart" element={<Cart />} />

          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />

          {/* protected user routes */}
          <Route element={<UserRoute />}>
            <Route exact path="/user/dashboard" element={<UserDashboard />} />
          </Route>
          {/* protected admin routes */}
          <Route element={<AdminRoute />}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              exact
              path="/admin/edit/product/:productId"
              element={<AdminEditProduct />}
            />
          </Route>

          <Route element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
