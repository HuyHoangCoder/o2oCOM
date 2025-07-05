import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartSidebar() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const sum = cartItems.reduce((acc, item) => {
      const price = parseInt(String(item.price).replace(/\D/g, ""), 10);
      return acc + price * item.quantity;
    }, 0);
    setTotal(sum);
  };

  const handleQuantityChange = (index, amount) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += amount;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };
  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
      calculateTotal(storedCart);
    };

    updateCart(); // Load ban đầu

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("cart"); // ✅ Xóa giỏ hàng
    window.dispatchEvent(new Event("cartUpdated")); // ✅ Báo cho các component khác cập nhật lại giao diện
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Overlay khi mở giỏ hàng */}
      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Nút giỏ hàng nổi cố định */}
      {!isOpen && (
        <div className="floating-cart-btn" onClick={() => setIsOpen(true)}>
          <i className="bi bi-bag fs-5"></i>
          {cart.length > 0 && (
            <span className="cart-count-badge">{cart.length}</span>
          )}
        </div>
      )}

      {/* Sidebar giỏ hàng */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h5>Giỏ hàng của bạn</h5>
          <button
            className="btn-close close"
            onClick={() => setIsOpen(false)}
          ></button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p className="text-center">Giỏ hàng trống.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  className="cart-item d-flex align-items-center mb-3"
                  key={index}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="me-2"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <strong>{item.name}</strong>
                    <p className="mb-1 text-muted">Không có ghi chú món ăn</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <strong>
                      {(
                        parseInt(String(item.price).replace(/\D/g, ""), 10) *
                        item.quantity
                      ).toLocaleString()}
                      ₫
                    </strong>
                    <p
                      className="text-danger small mb-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemove(index)}
                    >
                      × Xóa
                    </p>
                  </div>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <strong>{total.toLocaleString()}₫</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tổng cộng:</span>
                <strong>{total.toLocaleString()}₫</strong>
              </div>
              <button
                className="btn btn-warning w-100"
                onClick={handleCheckout}
              >
                THANH TOÁN
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
