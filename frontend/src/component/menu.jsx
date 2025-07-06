import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Menu() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [likedProducts, setLikedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 12;

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://14.225.71.45:8000/categories/categories"
        );
        const data = await res.json();
        setCategories(["Tất cả", ...data.map((cat) => cat.name)]);
      } catch {
        toast.error("Lỗi kết nối khi lấy danh mục!");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://14.225.71.45:8000/products/products");
        const data = await res.json();
        setAllProducts(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Lỗi kết nối khi lấy danh sách sản phẩm!");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchLikedProducts = async () => {
      try {
        const res = await fetch(
          `http://14.225.71.45:8000/wishlist/wishlist?user_id=${userId}`
        );
        if (res.ok) {
          const data = await res.json();
          setLikedProducts(data.map((item) => item.product_id));
          window.dispatchEvent(
            new CustomEvent("wishlistUpdated", { detail: data.length })
          );
        } else {
          setLikedProducts([]);
          window.dispatchEvent(
            new CustomEvent("wishlistUpdated", { detail: 0 })
          );
        }
      } catch {
        console.error("Lỗi kết nối khi lấy danh sách yêu thích!");
      }
    };
    fetchLikedProducts();
  }, [userId]);

  const filteredProducts = allProducts.filter(
    (product) =>
      (activeCategory === "Tất cả" ||
        product.category?.toLowerCase() === activeCategory.toLowerCase()) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts];
  if (sortOption === "az")
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (sortOption === "za")
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  if (sortOption === "new")
    sortedProducts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  if (sortOption === "priceAsc")
    sortedProducts.sort((a, b) => a.price - b.price);
  if (sortOption === "priceDesc")
    sortedProducts.sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleLike = async (productId) => {
    if (!userId) {
      toast.warning("Vui lòng đăng nhập để sử dụng tính năng yêu thích!");
      return;
    }

    const isLiked = likedProducts.includes(productId);

    try {
      if (isLiked) {
        const res = await fetch(
          `http://14.225.71.45:8000/wishlist/wishlist/${productId}?user_id=${userId}`,
          { method: "DELETE" }
        );
        if (res.ok) {
          const updatedLikes = likedProducts.filter((id) => id !== productId);
          setLikedProducts(updatedLikes);
          window.dispatchEvent(
            new CustomEvent("wishlistUpdated", { detail: updatedLikes.length })
          );
          toast.success("Đã xóa khỏi yêu thích!");
        } else {
          toast.error("Thao tác yêu thích thất bại!");
        }
      } else {
        const res = await fetch(
          `http://14.225.71.45:8000/wishlist/wishlist?user_id=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId }),
          }
        );
        if (res.ok) {
          const updatedLikes = [...likedProducts, productId];
          setLikedProducts(updatedLikes);
          window.dispatchEvent(
            new CustomEvent("wishlistUpdated", { detail: updatedLikes.length })
          );
          toast.success("Đã thêm vào yêu thích!");
        } else {
          toast.error("Thao tác yêu thích thất bại!");
        }
      }
    } catch {
      toast.error("Lỗi kết nối khi thao tác yêu thích!");
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock_quantity === 0) {
      toast.error(`"${product.name}" hiện đang hết hàng!`);
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (item) => item.id === product.product_id
    );

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({
        id: product.product_id,
        name: product.name,
        img: product.image_url,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <main className="main">
      <section className="featured-dishes section mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm">
                <div className="card-header fw-bold">Danh mục món ăn</div>
                <ul className="list-group list-group-flush">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`list-group-item ${
                        activeCategory === cat ? "active text-white" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                      }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-md-9">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <i className="bi bi-sort-alpha-down me-1"></i>
                  <span className="fw-semibold">Xếp theo</span>
                  {["az", "za", "new", "priceAsc", "priceDesc"].map((opt) => (
                    <button
                      key={opt}
                      className={`btn btn-outline-secondary btn-sm ${
                        sortOption === opt ? "active" : ""
                      }`}
                      onClick={() => setSortOption(opt)}
                    >
                      {opt === "az" && "Tên A-Z"}
                      {opt === "za" && "Tên Z-A"}
                      {opt === "new" && "Hàng mới"}
                      {opt === "priceAsc" && "Giá thấp đến cao"}
                      {opt === "priceDesc" && "Giá cao xuống thấp"}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm món ăn..."
                  style={{ maxWidth: "250px" }}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="row gy-3">
                {paginatedProducts.map((product) => (
                  <div
                    className="col-6 col-sm-4 col-md-4 mb-3"
                    key={product.product_id}
                  >
                    <div className="product-card position-relative h-100">
                      <div className="image-wrapper position-relative">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="img-fluid product-img rounded"
                        />
                        <div className="quick-view-overlay d-flex justify-content-center align-items-center">
                          <Link
                            to={`/menu/${product.product_id}`}
                            className="quick-view-text"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                        {product.stock_quantity === 0 && (
                          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center out-of-stock">
                            Hết hàng
                          </div>
                        )}
                        <button
                          className={`like-btn position-absolute top-0 end-0 m-2 ${
                            likedProducts.includes(product.product_id)
                              ? "liked"
                              : ""
                          }`}
                          onClick={() => toggleLike(product.product_id)}
                        >
                          <i
                            className={`bi ${
                              likedProducts.includes(product.product_id)
                                ? "bi-heart-fill"
                                : "bi-heart"
                            }`}
                          ></i>
                        </button>
                      </div>
                      <div className="product-info p-3">
                        <h5 className="product-title">{product.name}</h5>
                        <p className="product-desc">{product.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="product-price">
                            {product.price.toLocaleString()}₫
                          </span>
                          <button
                            className="btn btn-sm btn-cart"
                            disabled={product.stock_quantity === 0}
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="bi bi-cart-plus"></i> Thêm Ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={2000} />
    </main>
  );
}

export default Menu;
