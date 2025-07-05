import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function AccountLayout() {
  const username = localStorage.getItem("username");

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") ||
      "../src/assets/img/avatar/default-avatar.svg"
  );

  const [fullName, setFullName] = useState("Khách");
  const [rank, setRank] = useState("Khách hàng");

  useEffect(() => {
    if (!username) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `http://192.168.102.10:8000/auth/users/${username}`
        );
        if (res.ok) {
          const data = await res.json();
          setFullName(data.full_name);
          setRank(data.rank || "Khách hàng");
        } else {
          console.log("Không thể lấy thông tin tài khoản");
        }
      } catch {
        console.log("Lỗi kết nối khi lấy thông tin tài khoản");
      }
    };

    const fetchAvatar = async () => {
      try {
        const res = await fetch(
          `http://192.168.102.10:8000/users/${username}/avatar`
        );
        if (res.ok) {
          // TH1: Server trả về chuỗi đường dẫn ảnh
          const contentType = res.headers.get("Content-Type");

          if (contentType && contentType.includes("application/json")) {
            const avatarUrl = await res.text();

            // Nếu đường dẫn là dạng "/static/avatar.jpg" thì cần ghép domain
            const completeUrl = avatarUrl.startsWith("http")
              ? avatarUrl
              : `http://192.168.102.10:8000${avatarUrl}`;

            setAvatar(completeUrl);
            localStorage.setItem("avatar", completeUrl);
          }
          // TH2: Server trả về file ảnh thực sự (image/jpeg, image/png)
          else if (contentType && contentType.startsWith("image/")) {
            const blob = await res.blob();
            const avatarUrl = URL.createObjectURL(blob);
            setAvatar(avatarUrl);
          } else {
            setAvatar("../src/assets/img/avatar/default-avatar.svg");
          }
        } else {
          setAvatar("../src/assets/img/avatar/default-avatar.svg");
        }
      } catch {
        console.log("Lỗi kết nối khi lấy avatar");
        setAvatar("../src/assets/img/avatar/default-avatar.svg");
      }
    };

    fetchUserInfo();
    fetchAvatar();
  }, [username]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !username) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `http://192.168.102.10:8000/users/${username}/avatar`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        // Gọi lại fetchAvatar để lấy ảnh mới và cập nhật UI ngay lập tức
        fetchAvatar();
      } else {
        console.error("Lỗi khi cập nhật avatar");
      }
    } catch {
      console.error("Lỗi kết nối khi cập nhật avatar");
    }
  };

  const handleDeleteAvatar = async () => {
    if (!username) return;

    try {
      const res = await fetch(
        `http://192.168.102.10:8000/users/${username}/avatar`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // Gọi lại fetchAvatar để reset về ảnh mặc định ngay lập tức
        fetchAvatar();
      } else {
        console.error("Xóa avatar thất bại");
      }
    } catch {
      console.error("Lỗi kết nối khi xóa avatar");
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newAvatar = localStorage.getItem("avatar");
      if (newAvatar) {
        setAvatar(newAvatar);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <main className="main">
      <section className="account-page section py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card shadow-sm p-4 text-center">
                <div className="mb-3">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="rounded-circle border"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "3px solid #f26522",
                    }}
                  />
                </div>
                <h5 className="fw-bold mb-1">{fullName}</h5>
                <p className="text-muted mb-3">{rank}</p>
                <div className="d-flex justify-content-center gap-2 flex-wrap mb-3">
                  <label className="btn btn-outline-primary btn-sm">
                    Chọn ảnh
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      hidden
                    />
                  </label>
                </div>
                <hr />
                <ul className="list-unstyled text-start">
                  <li className="mb-2">
                    <Link
                      to="/account"
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-person-circle me-2 text-orange"></i>{" "}
                      Thông tin tài khoản
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/account/orders"
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-clock-history me-2 text-orange"></i>{" "}
                      Lịch sử đặt hàng
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/account/loyalty"
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-gem me-2 text-orange"></i> Điểm thưởng
                      & Cấp bậc
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/account/change-password"
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-shield-lock me-2 text-orange"></i> Đổi
                      mật khẩu
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/account/addresses"
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <i className="bi bi-geo-alt me-2 text-orange"></i> Địa chỉ
                      giao hàng
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/"
                      className="text-decoration-none d-flex align-items-center text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Thoát tài
                      khoản
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm p-4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AccountLayout;
