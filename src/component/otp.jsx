import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Lấy email từ query string hoặc state khi chuyển trang (tùy bạn truyền email thế nào)
  const location = useLocation();
  const email =
    location.state?.email ||
    new URLSearchParams(location.search).get("email") ||
    "";

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi mã OTP lên server để xác thực
    alert("Xác thực OTP thành công!");
    // Sau khi xác thực thành công, có thể chuyển hướng hoặc hiển thị thông báo
  };

  // Gửi lại OTP
  const handleResend = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Không tìm thấy email để gửi lại OTP.");
      return;
    }
    const params = new URLSearchParams();
    params.append("email", email);
    try {
      const res = await fetch("http://192.168.102.10:8000/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });
      if (res.ok) {
        setSuccess("Đã gửi lại mã OTP!");
      } else {
        setError("Gửi lại OTP thất bại.");
      }
    } catch (err) {
      setError("Lỗi kết nối server.");
    }
    setLoading(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ background: "#f8f9fa", minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Xác thực OTP</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="otp">
              Nhập mã OTP đã gửi tới email
            </label>
            <input
              className="form-control"
              id="otp"
              name="otp"
              required
              type="text"
              value={otp}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success w-100" type="submit">
            Xác thực
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            type="button"
            onClick={handleResend}
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi lại mã OTP"}
          </button>
        </div>
        <div className="text-center mt-3">
          <Link to="/">← Quay về Trang Chủ</Link>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
