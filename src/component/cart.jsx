import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  loadCart(); // Load ban đầu

  window.addEventListener("cartUpdated", loadCart);

  return () => {
    window.removeEventListener("cartUpdated", loadCart);
  };
}, []);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

const updateCart = (newCart) => {
  setCart(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.dispatchEvent(new Event("cartUpdated"));
};


  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const handleQuantityChange = (index, amount) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += amount;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(String(item.price).replace(/\D/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Giỏ hàng đang trống.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để thanh toán.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return; // CHẶN luôn không cho đi tiếp
    }

    navigate("/checkout");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Giỏ hàng của bạn</h4>

      {cart.length === 0 ? (
        <p>Giỏ hàng đang trống.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Số tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const price = Number(String(item.price).replace(/\D/g, ""));
                  return (
                    <tr key={index}>
                      <td className="d-flex align-items-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                          className="rounded me-2"
                        />
                        <span>{item.name}</span>
                      </td>
                      <td>{price.toLocaleString()}₫</td>
                      <td>
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
                      </td>
                      <td>{(price * item.quantity).toLocaleString()}₫</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemove(index)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-end mt-3">
            <h5>
              Tổng tiền:{" "}
              <span className="text-orange fw-bold">
                {calculateTotal().toLocaleString()}₫
              </span>
            </h5>
            <button className="btn btn-primary mt-2" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Cart;
