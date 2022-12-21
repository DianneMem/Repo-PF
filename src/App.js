import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/CreateProduct";
import Stripe from "./components/stripe/Stripe.jsx";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import Cart from "./components/cart/Cart.jsx"
import DashboardAdmin from "./components/dashboardAdmin/dashboardAdmin"
import { RecoverPassword } from "./components/recoverPassword/RecoverPassword";
import { ConfirmAcount } from "./components/confirmAcount/ConfirmAcount";
import Sellers from "./components/sellers/Sellers";
import Favorites from "./components/favorites/Favorites";


export default function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/recoverpassword" element={<RecoverPassword/>} />
          <Route exact path="/confirmacount" element={<ConfirmAcount/>} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createproduct" element={<CreateProduct />} />
          <Route exact path="/detail/:_id" element={<Detail />} />
          <Route exact path="/payment/:_id" element={<Stripe />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<DashboardAdmin/>} />
          <Route exact path="/sellers" element={<Sellers/>} />
          <Route exact path="/favorites" element={<Favorites/>} />
        </Routes>
      </Router>
    </div>
  );
}
