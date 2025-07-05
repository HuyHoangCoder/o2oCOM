import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header.jsx";
import Home from "./home.jsx";
import Footer from "./footer.jsx";
import ScrollTop from "./scrolltop.jsx";
import Contact from "./contact.jsx";
import Introduce from "./introduce.jsx";
import Team from "./team.jsx";
import Menu from "./menu.jsx";
import Wishlist from "./wishlist.jsx";
import Cart from "./cart.jsx";
import CartSidebar from "./cartsidebar.jsx";
import FoodDetail from "./fooddetail.jsx";
import Checkout from "./checkout.jsx";
import AccountLayout from "./accountlayout.jsx";
import Profile from "./profile.jsx";
import OrderHistory from "./orderhistory.jsx";
import Loyalty from "./loyalty.jsx";
import Addresses from "./addresses.jsx";
import ChangePassword from "./changepassword.jsx";
import RequireAuth from "../router/requireauth.jsx";
function Main() {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/team" element={<Team />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Protected routes */}
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route path="/menu/:id" element={<FoodDetail />} />

          {/* Group account routes */}
          <Route
            path="/account"
            element={
              <RequireAuth>
                <AccountLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Profile />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="loyalty" element={<Loyalty />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
        </Routes>
      </main>

      <Footer />
      <ScrollTop />
      <CartSidebar />
    </div>
  );
}

export default Main;
