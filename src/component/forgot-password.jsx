import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState("email"); // email | otp | reset
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gửi email để nhận OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const params = new URLSearchParams();
    params.append("email", form.email);

    try {
      const res = await fetch(
        "http://192.168.102.10:8000/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      const data = await res.json();
      console.log("Forgot password response:", data); // Thêm dòng này để debug
      if (res.ok) {
        setSuccess("Đã gửi mã OTP tới email của bạn.");
        setStep("otp");
      } else {
        setError(
          data.detail ? JSON.stringify(data.detail) : "Gửi OTP thất bại."
        );
      }
    } catch (err) {
      setError("Lỗi kết nối server.");
      console.error("Network error:", err);
    }
  };

  // Xác thực OTP (chuyển sang bước đặt lại mật khẩu)
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Có thể xác thực OTP ở backend, ở đây chuyển luôn sang bước reset
    setStep("reset");
  };

  // Đổi mật khẩu mới
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    const params = new URLSearchParams();
    params.append("email", form.email);
    params.append("otp", form.otp);
    params.append("new_password", form.newPassword);

    try {
      const res = await fetch(
        "http://192.168.102.10:8000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      if (res.ok) {
        setSuccess(
          "Đổi mật khẩu thành công! Đang chuyển về trang đăng nhập..."
        );
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const data = await res.json();
        setError(
          data.detail ? JSON.stringify(data.detail) : "Đổi mật khẩu thất bại."
        );
      }
    } catch (err) {
      setError("Lỗi kết nối server.");
    }
  };

  // Gửi lại OTP
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    const params = new URLSearchParams();
    params.append("email", form.email);
    try {
      const res = await fetch(
        "http://192.168.102.10:8000/auth/resend-otp-forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );
      if (res.ok) {
        setSuccess("Đã gửi lại mã OTP!");
      } else {
        setError("Gửi lại OTP thất bại.");
      }
    } catch (err) {
      setError("Lỗi kết nối server.");
    }
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
        {step === "email" && (
          <>
            <h3 className="text-center mb-4">Quên mật khẩu</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Nhập email đã đăng ký
                </label>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Gửi mã OTP
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to="/login">← Quay về đăng nhập</Link>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <h3 className="text-center mb-4">Xác thực OTP</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleOtpSubmit}>
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
                  value={form.otp}
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
                onClick={handleResendOtp}
              >
                Gửi lại mã OTP
              </button>
            </div>
          </>
        )}

        {step === "reset" && (
          <>
            <h3 className="text-center mb-4">Đặt lại mật khẩu mới</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleResetSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="newPassword">
                  Mật khẩu mới
                </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    required
                    type={showNewPassword ? "text" : "password"}
                    value={form.newPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    <i
                      className={
                        showNewPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">
                  Nhập lại mật khẩu mới
                </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    <i
                      className={
                        showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>
                  </button>
                </div>
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Đổi mật khẩu
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to="/login">← Quay về đăng nhập</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
