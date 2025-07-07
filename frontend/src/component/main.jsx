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
import FoodDetail from "./fooddetail.jsx";
import News from "./news.jsx";

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
          <Route path="/foodDetail" element={<FoodDetail/>}/>
          <Route path="/new" element={<News/>}/>



        </Routes>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}

export default Main;
