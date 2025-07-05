import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer dark-background" id="footer">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-geo-alt icon" />
              <div className="address">
                <h4>Địa Chỉ</h4>
                <p>C11/C12 Chanh, Đ. Phạm Hùng, Bình Hưng, Bình Chánh,</p>
                <p>TP. HỒ CHÍ MINH, VIỆT NAM</p>
                <p />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-telephone icon" />
              <div>
                <h4>Liên Hệ</h4>
                <p>
                  <strong>Điện thoại:</strong> <span>+0909 XXX XXX</span>
                  <br />
                  <strong>Email:</strong> <span>join@o2ocom.ai</span>
                  <br />
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-clock icon" />
              <div>
                <h4>Thời Gian Mở Cửa</h4>
                <p>
                  <strong>Thứ 2-Thứ 7:</strong> <span>8h - 23h</span>
                  <br />
                  <strong>Chủ nhật</strong>: <span>Đóng cửa</span>
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4>Theo dõi </h4>
              <div className="social-links d-flex">
                <a className="twitter" href="#">
                  <i className="bi bi-twitter-x" />
                </a>
                <a className="facebook" href="#">
                  <i className="bi bi-facebook" />
                </a>
                <a className="instagram" href="#">
                  <i className="bi bi-instagram" />
                </a>
                <a className="linkedin" href="#">
                  <i className="bi bi-linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Bản quyền</span>{" "}
            <strong className="px-1 sitename">2025 O2OCOM.AI</strong>{" "}
            <span>– Một sản phẩm từ hệ sinh thái vTradeX Holding</span>
          </p>
          <div className="credits">
            <a href="#" />
            <a href="#" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
