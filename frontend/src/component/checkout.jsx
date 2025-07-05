import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [showShipping, setShowShipping] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    note: "",
    paymentMethod: "",
  });

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

  //   const handleChange = (e) => {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   };

  const handlePaymentChange = (e) => {
    setForm({ ...form, paymentMethod: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.province ||
      !form.paymentMethod
    ) {
      alert("Vui lòng nhập đầy đủ thông tin và chọn phương thức thanh toán!");
      return;
    }
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    navigate("/");
  };
  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);

    // Kiểm tra điều kiện để hiện phần vận chuyển
    if (
      updatedForm.fullName.trim() &&
      updatedForm.phone.trim() &&
      updatedForm.address.trim() &&
      updatedForm.province.trim()
    ) {
      setShowShipping(true);
    } else {
      setShowShipping(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Thông tin nhận hàng */}
        <div className="col-lg-4">
          <h5 className="checkout-title">
            <i className="bi bi-person-circle me-2 text-primary"></i> Thông tin
            nhận hàng
          </h5>
          <div className="border p-3 mb-3">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              className="form-control mb-3"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              className="form-control mb-3"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              className="form-control mb-3"
              value={form.address}
              onChange={handleChange}
              required
            />
            <select
              name="province"
              className="form-control mb-3"
              value={form.province}
              onChange={handleChange}
              required
            >
              <option value="">Tỉnh thành</option>
              <option value="TP HCM">TP HCM</option>
              <option value="Hà Nội">Hà Nội</option>
            </select>
            <input
              type="text"
              name="district"
              placeholder="Quận huyện (tùy chọn)"
              className="form-control mb-3"
              value={form.district}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ward"
              placeholder="Phường xã (tùy chọn)"
              className="form-control mb-3"
              value={form.ward}
              onChange={handleChange}
            />
            <textarea
              name="note"
              rows="3"
              placeholder="Ghi chú (tùy chọn)"
              className="form-control"
              value={form.note}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Vận chuyển & Thanh toán */}
        <div className="col-lg-4">
          <h5 className="checkout-title">
            <i className="bi bi-truck me-2 text-primary"></i> Vận chuyển
          </h5>

          {!showShipping ? (
            <div className="shipping-notice">
              Vui lòng nhập đầy đủ thông tin nhận hàng để tính phí vận chuyển
              chính xác.
            </div>
          ) : (
            <div className="border p-3 mb-3">
              <div className="d-flex justify-content-between">
                <span>Hình thức giao hàng:</span>
                <strong>Giao nhanh</strong>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Phí vận chuyển:</span>
                <strong>20.000₫</strong>
              </div>
            </div>
          )}

          <h5 className="checkout-title">
            <i className="bi bi-credit-card me-2 text-primary"></i> Thanh toán
          </h5>
          <div className="border p-3">
            {["COD", "Momo", "Chuyển khoản"].map((method) => (
              <div className="form-check mb-2" key={method}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  onChange={handlePaymentChange}
                  checked={form.paymentMethod === method}
                />
                <label className="form-check-label">
                  {method === "COD"
                    ? "Thanh toán khi giao hàng (COD)"
                    : `Thanh toán qua ${method}`}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Đơn hàng */}
        <div className="col-lg-4">
          <h5 className="checkout-title">
            <i className="bi bi-bag-check me-2 text-primary"></i> Đơn hàng (
            {cart.length} sản phẩm)
          </h5>
          <div className="border p-3 mb-3">
            {cart.map((item, index) => (
              <div className="d-flex mb-2" key={index}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  className="me-2"
                />
                <div>
                  <strong>{item.name}</strong>
                  <p className="mb-1">
                    {parseInt(
                      String(item.price).replace(/\D/g, ""),
                      10
                    ).toLocaleString()}
                    ₫ x {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              className="form-control mb-3"
            />

            <div className="d-flex justify-content-between mb-2">
              <span>Tạm tính</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Phí vận chuyển</span>
              <span>20.000₫</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Tổng cộng</span>
              <span>{(total + 20000).toLocaleString()}₫</span>
            </div>
          </div>
          <button className="btn btn-warning w-100" onClick={handleSubmit}>
            ĐẶT HÀNG
          </button>
          <button className="btn-back" onClick={() => navigate("/cart")}>
            &lt; Quay về giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
