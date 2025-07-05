import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    full_name: "",
    phone: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [step, setStep] = useState("register"); // "register" | "otp"
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [emailForOtp, setEmailForOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (form.password !== form.confirmPassword) {
    setError("Mật khẩu nhập lại không khớp.");
    return;
  }

  const payload = {
    username: form.username.trim(),
    password: form.password.trim(),
    email: form.email.trim(),
    full_name: form.full_name.trim(),
    phone: form.phone.trim(),
  };

  try {
    const res = await fetch("http://192.168.102.10:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess("Đăng ký thành công! Vui lòng kiểm tra email để xác thực OTP.");
      setEmailForOtp(form.email);
      setStep("otp");
    } else {
      const data = await res.json();
      setError(data.detail ? JSON.stringify(data.detail) : "Đăng ký thất bại.");
    }
  } catch (err) {
    setError("Lỗi kết nối server.");
  }
};


  // Xác thực OTP
  const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const payload = {
    email: emailForOtp.trim(),
    otp: otp.trim(),
  };

  try {
    const res = await fetch("http://192.168.102.10:8000/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSuccess("Xác thực OTP thành công! Đang chuyển đến trang đăng nhập...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      const data = await res.json();
      setError(data.detail ? JSON.stringify(data.detail) : "Xác thực OTP thất bại.");
    }
  } catch (err) {
    setError("Lỗi kết nối server.");
  }
};


  // Gửi lại OTP
  const handleResend = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    if (!emailForOtp) {
      setError("Không tìm thấy email để gửi lại OTP.");
      setLoading(false);
      return;
    }
    const params = new URLSearchParams();
    params.append("email", emailForOtp);
    try {
      const res = await fetch("http://192.168.102.10:8000/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        {step === "register" && (
          <>
            <h3 className="text-center mb-4">Đăng Ký</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Tên đăng nhập *
                </label>
                <input
                  className="form-control"
                  id="username"
                  name="username"
                  required
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="full_name">
                  Họ và tên
                </label>
                <input
                  className="form-control"
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={form.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email *
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
              <div className="mb-3">
                <label className="form-label" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  className="form-control"
                  id="phone"
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Mật khẩu *
                </label>
                <div className="input-group">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <i
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">
                  Nhập lại mật khẩu *
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
                    aria-label={
                      showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                    }
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
                Đăng ký
              </button>
            </form>
            <p className="mt-3 text-center">
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
            <div className="text-center mt-3">
              <Link className="mt-3 text-center" to="/">
                ← Quay về Trang Chủ
              </Link>
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
