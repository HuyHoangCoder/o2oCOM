import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { allProducts } from "../data/data";

function Home() {
  const [likedItems, setLikedItems] = useState([]);
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [comboDishes, setComboDishes] = useState([]);
  const [starters, setStarters] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (dish) => {
    if (dish.stock_quantity === 0) {
      toast.error(`"${dish.name}" hiện đang hết hàng!`);
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (item) => item.id === dish.product_id
    );

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({
        id: dish.product_id,
        name: dish.name,
        img: dish.image_url,
        price: dish.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Đã thêm "${dish.name}" vào giỏ hàng!`);
  };

  useEffect(() => {
    const isBestSeller = (item) => item.discount_percent > 0;

    setFeaturedDishes(allProducts.slice(0, 5));
    setBestSellers(allProducts.filter(isBestSeller));
    setComboDishes(allProducts.filter((item) => item.category === "Combo"));
    setStarters(allProducts.filter((item) => item.category === "Khai vị"));
    setBreakfast(allProducts.filter((item) => item.category === "Bữa sáng"));
    setLunch(allProducts.filter((item) => item.category === "Bữa trưa"));
    setDinner(allProducts.filter((item) => item.category === "Bữa tối"));

    window.addEventListener("cartUpdated", () =>
      console.log("Giỏ hàng đã được cập nhật!")
    );
    return () =>
      window.removeEventListener("cartUpdated", () =>
        console.log("Giỏ hàng đã được cập nhật!")
      );
  }, []);

  const renderProductCard = (dish, col = "col-6 col-md-4 col-lg-2") => (
    <div className={col} key={dish.product_id}>
      <div className="product-card position-relative">
        <div className="image-wrapper position-relative">
          <button
            className={`like-btn position-absolute top-0 end-0 m-2 ${
              likedItems.includes(dish.product_id) ? "liked" : ""
            }`}
            onClick={() => toggleLike(dish.product_id)}
          >
            <i
              className={`bi ${
                likedItems.includes(dish.product_id)
                  ? "bi-heart-fill"
                  : "bi-heart"
              }`}
            ></i>
          </button>
          <img
            src={
              dish.image_url ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={dish.name}
            className="img-fluid product-img rounded"
          />
          <div className="quick-view-overlay d-flex justify-content-center align-items-center">
            <Link to={`/menu/${dish.product_id}`} className="quick-view-text">
              Xem Chi Tiết
            </Link>
          </div>
          {dish.stock_quantity === 0 && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center out-of-stock">
              HẾT HÀNG
            </div>
          )}
        </div>
        <div className="product-info p-3">
          <h5 className="product-title">{dish.name}</h5>
          <p className="product-desc">{dish.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="product-price">
              {dish.price.toLocaleString()}₫
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="main">
      {/* Banner Hero */}
      <section className="hero section light-background" id="hero">
        <div className="container">
          <div className="row gy-4 justify-content-center justify-content-lg-between">
            <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Bữa ăn văn phòng tối ưu từ công nghệ O2O</h1>
              <p>
                Liên kết bếp trung tâm + điểm bán + QR + Tích điểm = Cơm ngon
                tới tay bạn
              </p>
              <div className="d-flex">
                <a className="btn-get-started" href="#menu">
                  Tìm hiểu thêm
                </a>
                <a
                  className="glightbox btn-watch-video d-flex align-items-center"
                  href="../src/assets/img/noi_dung-.mp4"
                >
                  <i className="bi bi-play-circle" />
                  <span>Xem Video</span>
                </a>
              </div>
            </div>
            <div className="col-lg-5 order-1 order-lg-2 hero-img">
              <img
                alt=""
                className="img-fluid animated"
                src="../src/assets/img/mon-an-ngon-removebg-preview.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Món Nổi Bật */}
      <section className="featured-dishes section position-relative ">
        <div className="container section-title">
          <h2>Món Ăn Nổi Bật</h2>
          <p>
            <span>Những món ăn</span>{" "}
            <span className="description-title">được yêu thích nhất</span>
          </p>
        </div>

        {/* Nút Scroll Trái */}
        <button
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
          style={{ zIndex: 2 }}
          onClick={() =>
            document
              .getElementById("featured-scroll")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        {/* Nút Scroll Phải */}
        <button
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
          style={{ zIndex: 2 }}
          onClick={() =>
            document
              .getElementById("featured-scroll")
              .scrollBy({ left: 300, behavior: "smooth" })
          }
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        <div className="container scroll-horizontal-container mb-3">
          <div
            className="row gy-4 d-flex flex-nowrap overflow-auto mb-3"
            id="featured-scroll"
            style={{ scrollBehavior: "smooth" }}
          >
            {featuredDishes.map((dish) => renderProductCard(dish))}
          </div>
        </div>
      </section>

      {/* Combo */}
      <section className="combo section">
        <div className="container section-title">
          <h2>Combo Tiết Kiệm</h2>
          <p>
            <span>Combo</span>{" "}
            <span className="description-title">dành cho dân văn phòng</span>
          </p>
        </div>
        <div className="container scroll-horizontal-container">
          <div className="row gy-5 d-flex flex-nowrap">
            {comboDishes.map((dish) =>
              renderProductCard(dish, "col-6 col-md-4 col-lg-3")
            )}
          </div>
        </div>
      </section>

      {/* Menu theo bữa */}
      <section className="menu section" id="menu">
        <div className="container section-title">
          <h2>Menu theo bữa</h2>
          <p>
            <span>Khám phá</span>{" "}
            <span className="description-title">Menu O2OCOM</span>
          </p>
        </div>
        <div className="container">
          <ul className="nav nav-tabs d-flex justify-content-center">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-target="#menu-starters"
                data-bs-toggle="tab"
              >
                Món khai vị
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-target="#menu-breakfast"
                data-bs-toggle="tab"
              >
                Bữa sáng
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-target="#menu-lunch"
                data-bs-toggle="tab"
              >
                Bữa trưa
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-target="#menu-dinner"
                data-bs-toggle="tab"
              >
                Bữa tối
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="menu-starters">
              <div className="product-scroll-container">
                <div className="row gy-5">
                  {starters.map((dish) =>
                    renderProductCard(dish, "col-6 col-md-4 col-lg-2")
                  )}
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="menu-breakfast">
              <div className="product-scroll-container">
                <div className="row gy-5">
                  {breakfast.map((dish) =>
                    renderProductCard(dish, "col-6 col-md-4 col-lg-2")
                  )}
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="menu-lunch">
              <div className="product-scroll-container">
                <div className="row gy-5">
                  {lunch.map((dish) =>
                    renderProductCard(dish, "col-6 col-md-4 col-lg-2")
                  )}
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="menu-dinner">
              <div className="product-scroll-container">
                <div className="row gy-5">
                  {dinner.map((dish) =>
                    renderProductCard(dish, "col-6 col-md-4 col-lg-2")
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bán chạy */}
      <section className="best-sellers section light-background">
        <div className="container section-title">
          <h2>Món Bán Chạy</h2>
          <p>
            <span>Top món ăn</span>{" "}
            <span className="description-title">được đặt nhiều nhất</span>
          </p>
        </div>
      
        <div className="container scroll-horizontal-container">
          <div className="row gy-4 d-flex flex-nowrap overflow-auto mb-3"
            id="best-sellersscroll"
            style={{ scrollBehavior: "smooth" }}>
            {bestSellers.map((dish) =>
              renderProductCard(dish, "col-6 col-md-4 col-lg-3")
            )}
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={2000} />
    </main>
  );
}

export default Home;
