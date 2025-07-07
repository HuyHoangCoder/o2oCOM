import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allProducts } from "../data/data";

function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const product = allProducts.find((p) => p.product_id === parseInt(id));
    if (product) {
      setDish(product);
      setQuantity(1);
    } else {
      toast.error("Không tìm thấy món ăn!");
      navigate("/menu");
    }
  }, [id, navigate]);

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

  const similarProducts = allProducts.filter(
    (p) =>
      p.category_id === dish?.category_id && p.product_id !== dish?.product_id
  );

  if (!dish) return null;

  return (
    <div className="container py-4 food-detail-page">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <Link to="/" className="text-decoration-none">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link to="/menu" className="text-decoration-none">
          Menu
        </Link>{" "}
        / <span className="fw-bold">{dish.name}</span>
      </nav>

      {/* Chi tiết món ăn */}
      <div className="row mb-5">
        <div className="col-lg-6">
          <div className="food-image-wrapper shadow-sm rounded">
            <img
              src={dish.image_url}
              alt={dish.name}
              className="img-fluid rounded"
            />
            {dish.stock_quantity === 0 && (
              <div className="out-of-stock-banner">Hết hàng</div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <h2 className="fw-bold">{dish.name}</h2>
          <div className="mb-3">
            <span className="text-warning fs-5">★★★★☆</span>
            <small className="ms-2 text-muted">(23 đánh giá)</small>
          </div>
          <p className="text-muted mb-2">
            Tình trạng:{" "}
            <span
              className={`fw-bold ${
                dish.stock_quantity > 0 ? "text-success" : "text-danger"
              }`}
            >
              {dish.stock_quantity > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>
          <p className="text-muted mb-2">Số lượng còn: {dish.stock_quantity}</p>

          {dish.discount_percent > 0 ? (
            <>
              <h4 className="text-danger fw-bold">
                {Math.round(
                  dish.price * (1 - dish.discount_percent / 100)
                ).toLocaleString()}
                ₫
              </h4>
              <p className="text-muted text-decoration-line-through">
                Giá gốc: {dish.price.toLocaleString()}₫
              </p>
              <div className="alert alert-success py-2">
                🎉 Ưu đãi {dish.discount_percent}%
              </div>
            </>
          ) : (
            <h4 className="text-danger fw-bold">
              {dish.price.toLocaleString()}₫
            </h4>
          )}

          <p className="mt-3">{dish.description}</p>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="p-4 mb-5 bg-light rounded shadow-sm">
        <h5 className="fw-bold mb-3">Thông tin chi tiết</h5>
        <ul className="list-unstyled">
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

      {/* Sản phẩm tương tự */}
      {similarProducts.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-3">Món ăn tương tự</h4>
          <div className="row gy-3">
            {similarProducts.slice(0, 4).map((product) => (
              <div className="col-6 col-md-3" key={product.product_id}>
                <div className="similar-product-card shadow-sm h-100">
                  <div className="position-relative similar-product-img-wrapper">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="img-fluid rounded w-100 h-100 object-cover"
                    />
                    {product.stock_quantity === 0 && (
                      <span className="badge bg-danger position-absolute top-0 start-0 m-1">
                        Hết hàng
                      </span>
                    )}
                  </div>

                  <div className="p-2">
                    <h6 className="fw-bold mb-1">{product.name}</h6>
                    <p className="small text-muted mb-2">
                      {product.description}
                    </p>
                    <p className="fw-bold text-danger mb-2">
                      {product.price.toLocaleString()}₫
                    </p>
                    <Link
                      to={`/menu/${product.product_id}`}
                      className="btn btn-outline-primary btn-sm w-100"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default FoodDetail;
