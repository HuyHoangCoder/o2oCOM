import React from "react";

function Team() {
  return (
    <>
      <main className="main">
        <section className="chefs section" id="doingu">
          <div className="container section-title" data-aos="fade-up">
            <h2>Đầu bếp</h2>
            <p>
              <span>Đội ngũ</span>{" "}
              <span className="description-title">
                Đầu bếp chuyên nghiệp
                <br />
              </span>
            </p>
          </div>
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-4 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      alt=""
                      className="img-fluid"
                      src="./assets/img/chefs/chefs-1.jpg"
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Nguyễn Văn An</h4>
                    <span>Bếp trưởng</span>
                    <p>
                      Với hơn 15 năm kinh nghiệm trong lĩnh vực ẩm thực, anh An
                      luôn sáng tạo ra những món ăn độc đáo, mang đậm hương vị
                      truyền thống kết hợp hiện đại, làm hài lòng mọi thực
                      khách.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      alt=""
                      className="img-fluid"
                      src="./assets/img/chefs/chefs-2.jpg"
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Trần Thị Mai</h4>
                    <span>Bếp phụ</span>
                    <p>
                      Chuyên gia các món bánh ngọt và tráng miệng, chị Mai luôn
                      mang đến những chiếc bánh tươi ngon, đẹp mắt và đảm bảo
                      chất lượng cho mọi bữa tiệc tại O2OCOM.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="team-member">
                  <div className="member-img">
                    <img
                      alt=""
                      className="img-fluid"
                      src="./assets/img/chefs/chefs-3.jpg"
                    />
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter-x" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                  <div className="member-info">
                    <h4>Lê Minh Tuấn</h4>
                    <span>Phụ bếp</span>
                    <p>
                      Luôn tận tâm và tỉ mỉ trong từng công đoạn, anh Tuấn góp
                      phần tạo nên những bữa ăn chất lượng, đảm bảo vệ sinh an
                      toàn thực phẩm cho khách hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Team;
