import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FoodDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("http://192.168.102.10:8000/product/products");
        if (res.ok) {
          const data = await res.json();
          setAllProducts(data);
        } else {
          toast.error("Không thể lấy danh sách món ăn.");
        }
      } catch {
        toast.error("Lỗi kết nối máy chủ.");
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await fetch(
          `http://192.168.102.10:8000/product/product/${id}`
        );
        if (res.ok) {
          const data = await res.json();
          setDish(data);
        } else {
          toast.error("Không thể lấy thông tin món ăn.");
        }
      } catch {
        toast.error("Lỗi kết nối máy chủ.");
      }
    };

    fetchDish();
  }, [id]);

  const handleAddToCart = () => {
    if (dish.stock_quantity === 0) {
      toast.error("Món ăn hiện đang hết hàng!");
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (item) => item.id === dish.product_id
    );

    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += quantity;
    } else {
      storedCart.push({
        id: dish.product_id,
        name: dish.name,
        img: dish.image_url,
        price: dish.price,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Đã thêm ${quantity} "${dish.name}" vào giỏ hàng!`);
  };

  if (!dish) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-orange" role="status"></div>
        <p className="mt-3">Đang tải thông tin món ăn...</p>
      </div>
    );
  }

  return (
    <div className="container food-detail-container">
      <div className="food-detail-breadcrumb mb-3">
        <Link to="/">Trang chủ</Link> / <Link to="/menu">Menu</Link> /{" "}
        <span>{dish.name}</span>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-md-6">
          <div className="food-detail-card">
            <img
              src={dish.image_url}
              alt={dish.name}
              className="food-detail-image"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="food-detail-card h-100">
            <h2>{dish.name}</h2>

            {/* Rating giả lập */}
            <div className="mb-2">
              <span className="text-warning">★★★★☆</span>
              <small className="ms-2 text-muted">(23 đánh giá)</small>
            </div>

            {/* Trạng thái */}
            <span
              className={`food-detail-status ${
                dish.stock_quantity > 0 ? "instock" : "outofstock"
              }`}
            >
              {dish.stock_quantity > 0 ? "Còn hàng" : "Hết hàng"}
            </span>

            <p className="text-muted">
              Số lượng còn lại: {dish.stock_quantity}
            </p>

            {/* Ưu đãi */}
            {dish.discount_percent > 0 && (
              <div className="alert alert-success py-1">
                🎉 Ưu đãi {dish.discount_percent}% - Giá chỉ còn{" "}
                <strong>
                  {(
                    dish.price *
                    (1 - dish.discount_percent / 100)
                  ).toLocaleString()}
                  ₫
                </strong>
              </div>
            )}

            <div className="food-detail-price">
              {dish.price.toLocaleString()}₫
            </div>

            <p className="food-detail-description">{dish.description}</p>

            {dish.stock_quantity > 0 && (
              <div>
                <label className="me-2">Số lượng:</label>
                <input
                  type="number"
                  min="1"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <br />
                <button className="btn-addcart mt-3" onClick={handleAddToCart}>
                  <i className="bi bi-cart-plus me-2"></i>Thêm vào giỏ hàng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phần mô tả chi tiết */}
      <div className="food-detail-card mb-4">
        <h4>Thông tin chi tiết</h4>
        <ul>
          <li>
            <strong>Danh mục:</strong> {dish.category}
          </li>
          <li>
            <strong>Thành phần:</strong> {dish.ingredients}
          </li>
          <li>
            <strong>Thời gian chế biến:</strong> {dish.cooking_time_minutes}{" "}
            phút
          </li>
          <li>
            <strong>Calories:</strong> {dish.calories} kcal
          </li>
        </ul>
      </div>

      {/* Gợi ý món tương tự */}
      {/* Phần gợi ý món tương tự */}
      <div className="mb-4">
        <h4>Món ăn tương tự</h4>
        <div className="row gy-3">
          {allProducts
            .filter(
              (product) =>
                product.category_id === dish.category_id &&
                product.product_id !== dish.product_id
            )
            .slice(0, 4) // Tối đa 4 món tương tự
            .map((product) => (
              <div
                className="col-6 col-sm-4 col-md-3 mb-3"
                key={product.product_id}
              >
                <div className="product-card position-relative h-100">
                  <div className="image-wrapper position-relative">
                    <img
                      src={
                        product.image_url ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={product.name}
                      className="img-fluid product-img rounded"
                    />
                    <div className="quick-view-overlay d-flex justify-content-center align-items-center">
                      <a
                        href={`/menu/${product.product_id}`}
                        className="quick-view-text"
                      >
                        Xem chi tiết
                      </a>
                    </div>
                    {product.stock_quantity === 0 && (
                      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center out-of-stock">
                        Hết hàng
                      </div>
                    )}
                  </div>
                  <div className="product-info p-2">
                    <h6 className="product-title">{product.name}</h6>
                    <p className="product-desc">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="product-price text-danger">
                        {product.price.toLocaleString()}₫
                      </span>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        disabled={product.stock_quantity === 0}
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-1"></i> Thêm vào giỏ
                        hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default FoodDetail;
