import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") ||
      "../src/assets/img/avatar/default-avatar.svg"
  );

  const [wishlistCount, setWishlistCount] = useState(0);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (!username) {
        setWishlistCount(0);
        return;
      }

      try {
        const res = await fetch(
          `http://192.168.102.10:8000/wishlist/${username}`
        );
        if (res.ok) {
          const data = await res.json();
          setWishlistCount(Array.isArray(data) ? data.length : 0);
        } else {
          setWishlistCount(0);
        }
      } catch {
        setWishlistCount(0);
      }
    };

    fetchWishlistCount();

    const handleWishlistUpdate = (e) => {
      setWishlistCount(e.detail);
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    return () =>
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
  }, [username]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    if (!username) return;

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `http://192.168.102.10:8000/auth/users/${username}`
        );
        if (res.ok) {
          const data = await res.json();
          setUserInfo({
            full_name: data.full_name,
            rank: data.rank || "Khách hàng",
          });
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
          const contentType = res.headers.get("Content-Type");

          if (contentType && contentType.includes("application/json")) {
            const avatarUrl = await res.text();
            const completeUrl = avatarUrl.startsWith("http")
              ? avatarUrl
              : `http://192.168.102.10:8000${avatarUrl}`;

            setAvatar(completeUrl);
            localStorage.setItem("avatar", completeUrl);
          } else if (contentType && contentType.startsWith("image/")) {
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

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserInfo((prev) => ({
          ...prev,
          full_name: payload.sub || prev?.full_name,
        }));
      } catch (err) {
        console.error("Lỗi giải mã token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "avatar") {
        setAvatar(e.newValue || "../src/assets/img/avatar/default-avatar.svg");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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

  const handleDropdown = () => {
    setDropdownOpen((open) => !open);
  };

  const handleMobileNav = () => {
    setMobileNavOpen((open) => {
      if (!open) {
        document.body.classList.add("mobile-nav-active");
      } else {
        document.body.classList.remove("mobile-nav-active");
      }
      return !open;
    });
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    document.body.classList.remove("mobile-nav-active");
  };

  return (
    <header className="header d-flex align-items-center sticky-top" id="header">
      <div className="container position-relative d-flex align-items-center">
        <Link className="logo d-flex align-items-center me-3" to="/">
          <h1 className="sitename">O2OCOM</h1>
        </Link>

        <nav
          className={`navmenu${mobileNavOpen ? " navmenu-mobile-open" : ""}`}
          id="navmenu"
        >
          <ul>
            {mobileNavOpen && (
              <li className="mobile-top-actions d-flex align-items-center justify-content-between">
                <button
                  className="mobile-close-btn"
                  onClick={closeMobileNav}
                  aria-label="Đóng menu"
                  type="button"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
                <Link
                  className="btn position-relative cart-btn me-3"
                  to="/cart"
                >
                  <i className="bi bi-cart"></i>
                  {cartCount > 0 && (
                    <span className="cart-badge position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            )}

            {mobileNavOpen && (
              <li className="navmenu-account-mobile">
                {isLoggedIn ? (
                  <div className="account-menu-detailed">
                    <div className="account-header d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={avatar}
                          alt="avatar"
                          className="avatar"
                          style={{
                            width: "36px",
                            height: "36px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: "8px",
                          }}
                        />
                        <div className="username">
                          {userInfo?.full_name || "Tên tài khoản"} <br />
                          <small className="text-muted">
                            {userInfo?.rank || "Khách hàng"}
                          </small>
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn-logout"
                        onClick={handleLogout}
                      >
                        Thoát
                      </button>
                    </div>

                    <div className="account-card-grid mt-3">
                      <button
                        onClick={() => {
                          closeMobileNav();
                          navigate("/account");
                        }}
                      >
                        <i className="bi bi-person-circle me-2"></i>
                        <span>Thông tin cá nhân</span>
                      </button>
                      <button
                        onClick={() => {
                          closeMobileNav();
                          navigate("/wishlist");
                        }}
                        className="d-flex align-items-center justify-content-between w-100"
                      >
                        <span>
                          <i className="bi bi-heart-fill me-2"></i> Yêu thích
                        </span>
                        {wishlistCount > 0 && (
                          <span className="badge bg-danger">
                            {wishlistCount}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          closeMobileNav();
                          navigate("/support");
                        }}
                      >
                        <i className="bi bi-question-circle"></i>
                        <span>Hỗ trợ</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    className="btn btn-getstarted w-100 text-center"
                    to="/login"
                    onClick={closeMobileNav}
                  >
                    Đăng nhập
                  </Link>
                )}
              </li>
            )}
            <li>
              <Link to="/" onClick={closeMobileNav}>
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link to="/introduce" onClick={closeMobileNav}>
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to="/menu" onClick={closeMobileNav}>
                Menu & Đặt Món
              </Link>
            </li>
            <li>
              <Link to="/team" onClick={closeMobileNav}>
                Đầu Bếp
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileNav}>
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions d-flex align-items-center ms-auto">
          {isLoggedIn ? (
            <div className="account-dropdown">
              <button
                className="account-btn position-relative"
                type="button"
                onClick={handleDropdown}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  style={{
                    width: "28px",
                    height: "28px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: "6px",
                  }}
                />
                {userInfo?.full_name || "Tên tài khoản"}
              </button>
              {dropdownOpen && (
                <ul className="account-dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/cart"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="bi bi-cart"></i> Giỏ hàng ({cartCount})
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center justify-content-between"
                      to="/wishlist"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span>
                        <i className="bi bi-heart-fill me-2"></i> Yêu thích
                      </span>
                      {wishlistCount > 0 && (
                        <span className="badge bg-danger">{wishlistCount}</span>
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/account"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="bi bi-person"></i> Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link className="btn-getstarted" to="/login">
              Đăng nhập
            </Link>
          )}
        </div>

        <button
          className="mobile-nav-toggle d-xl-none"
          onClick={handleMobileNav}
          aria-label="Mở menu"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
