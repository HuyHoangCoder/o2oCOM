import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const fetchUserId = async (username) => {
    try {
      const res = await fetch(
        `http://192.168.102.10:8000/auth/users/${username}`
      );
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user_id", data.id); // Lưu user_id vào localStorage
      }
    } catch {
      console.error("Lỗi lấy user_id");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    username: form.username,
    password: form.password,
  };

  try {
    const res = await fetch("http://192.168.102.10:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      const token = data.access_token;
      localStorage.setItem("token", token);

      // Giải mã token lấy thông tin role
      const payloadDecoded = JSON.parse(atob(token.split(".")[1]));

      if (payloadDecoded.role !== "member") {
        toast.error("Chỉ tài khoản Member được phép đăng nhập!");
        localStorage.removeItem("token");
        return;
      }

      toast.success("Đăng nhập thành công!");
      setTimeout(() => (window.location.href = "/"), 1500);
    } else {
      const data = await res.json();
      toast.error(data.detail || "Đăng nhập thất bại.");
    }
  } catch {
    toast.error("Lỗi kết nối server.");
  }
};




  const fetchAvatar = async (username) => {
    try {
      const res = await fetch(
        `http://192.168.102.10:8000/users/${username}/avatar`
      );
      if (res.ok) {
        const avatarUrl = await res.text();
        localStorage.setItem("avatar", avatarUrl);
      } else {
        localStorage.setItem(
          "avatar",
          "../src/assets/img/avatar/default-avatar.svg"
        );
      }
    } catch {
      localStorage.setItem(
        "avatar",
        "../src/assets/img/avatar/default-avatar.svg"
      );
    }
  };

  const syncCartAfterLogin = async (username) => {
    try {
      const res = await fetch(`http://192.168.102.10:8000/cart/${username}`);
      if (res.ok) {
        const serverCart = await res.json();
        localStorage.setItem("cart", JSON.stringify(serverCart));
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        await fetch(`http://192.168.102.10:8000/cart/${username}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(localCart),
        });
      }
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      console.error("Lỗi đồng bộ giỏ hàng sau đăng nhập");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Đăng Nhập</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              className="form-control"
              id="username"
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  style={{ marginRight: "5px" }}
                />
                <label htmlFor="remember" style={{ marginBottom: 0 }}>
                  Ghi nhớ mật khẩu
                </label>
              </div>
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Đăng nhập
          </button>
        </form>

        <div className="my-3 text-center">Hoặc đăng nhập bằng</div>
        <div className="d-flex justify-content-center gap-2 mb-3">
          <a
            href="http://192.168.102.10:8000/auth/login/google"
            className="btn btn-outline-danger d-flex align-items-center gap-2"
          >
            <i className="bi bi-google"></i> Google
          </a>
          <a
            href="http://192.168.102.10:8000/auth/login/facebook"
            className="btn btn-outline-primary d-flex align-items-center gap-2"
          >
            <i className="bi bi-facebook"></i> Facebook
          </a>
          <a
            href="http://192.168.102.10:8000/auth/login/twitter"
            className="btn btn-outline-info d-flex align-items-center gap-2"
          >
            <i className="bi bi-twitter"></i> Twitter
          </a>
        </div>

        <p className="mt-3 text-center">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
        <div className="text-center mt-3">
          <Link to="/">← Quay về Trang Chủ</Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Login;
