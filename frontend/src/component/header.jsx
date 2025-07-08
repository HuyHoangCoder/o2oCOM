import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
      <div className="container d-flex align-items-center justify-content-between">
        <Link className="logo d-flex align-items-center me-3" to="/">
          <h1 className="sitename m-0">O2OCOM</h1>
        </Link>

        <nav
          className={`navmenu${mobileNavOpen ? " navmenu-mobile-open" : ""}`}
          id="navmenu"
        >
          <ul>
            {mobileNavOpen && (
              <li className="mobile-top-actions d-flex align-items-center justify-content-end">
                <button
                  className="mobile-close-btn"
                  onClick={closeMobileNav}
                  aria-label="Đóng menu"
                  type="button"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </li>
            )}
            <li>
              <Link to="/" onClick={closeMobileNav}>
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link to="/introduce" onClick={closeMobileNav}>
                Giới Thiệu
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
              <Link to="/news" onClick={closeMobileNav}>
                Tin Tức
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileNav}>
                Liên Hệ
              </Link>
            </li>
            
          </ul>
        </nav>

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
