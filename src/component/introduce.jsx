import React from "react";

function Introduce() {
  return (
    <>
      <main className="main">
        <section className="about section" id="about">
          <div className="container section-title" data-aos="fade-up">
            <h2>
              O2OCOM.AI là gì?
              <br />
            </h2>
            <p>
              <span>Tìm hiểu thêm</span>{" "}
              <span className="description-title">Giới thiệu</span>
            </p>
          </div>
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
                <img
                  alt=""
                  className="img-fluid mb-4"
                  src="../src/assets/img/about.jpg"
                />
                <div className="book-a-table">
                  <h3>Liên hệ chúng tôi</h3>
                  <p>+0909 XXX XXX</p>
                </div>
              </div>
              <div className="col-lg-5" data-aos="fade-up" data-aos-delay="250">
                <div className="content ps-0 ps-lg-5">
                  <p className="fst-italic">
                    Là nền tảng đặt cơm trưa thông minh kết nối trực tiếp giữa
                    bếp trung tâm và người dùng, thông qua hệ thống điểm bán địa
                    phương. Chúng tôi giúp doanh nghiệp & cá nhân trải nghiệm
                    suất ăn nhanh, ngon, tiết kiệm với hệ thống đặt món – tích
                    điểm – phản hồi minh bạch.
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check-circle-fill" />{" "}
                      <span>Cơm giao nhanh – nóng sốt.</span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />{" "}
                      <span>Tích điểm đổi thưởng.</span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />{" "}
                      <span>Quản lý suất ăn doanh nghiệp.</span>
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill" />{" "}
                      <span>Giao diện đặt món tiện lợi trên mobile.</span>
                    </li>
                  </ul>
                  <p>
                    O2OCOM.AI là giải pháp công nghệ giúp doanh nghiệp & cá nhân
                    tối ưu hóa bữa ăn văn phòng, tiết kiệm thời gian và chi phí.
                    Chúng tôi kết nối trực tiếp với các bếp trung tâm, mang đến
                    cho bạn những suất ăn chất lượng, nhanh chóng và tiện lợi.
                  </p>
                  <div className="position-relative mt-4">
                    <img
                      alt=""
                      className="img-fluid"
                      src="../src/assets/img/comga4.png"
                    />
                    <a
                      className="glightbox pulsating-play-btn"
                      href="../src/assets/img/noi_dung-.mp4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="why-us section light-background" id="loiich">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                <div className="why-box">
                  <h3>Tại sao chọn O2OCOM</h3>
                  <p>
                    Chúng tôi mang đến giải pháp bữa ăn văn phòng nhanh, ngon,
                    tiết kiệm, minh bạch và tiện lợi cho doanh nghiệp & cá nhân.
                    Kết nối trực tiếp bếp trung tâm và người dùng, tối ưu hóa
                    trải nghiệm đặt món và tích điểm đổi thưởng.
                  </p>
                  <div className="text-center">
                    <a className="more-btn" href="#">
                      <span>Xem thêm</span>{" "}
                      <i className="bi bi-chevron-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div
                  className="row gy-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="col-xl-4">
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-clipboard-data" />
                      <h4>Quản lý suất ăn doanh nghiệp</h4>
                      <p>
                        Hệ thống quản lý thông minh, dễ dàng kiểm soát và đặt
                        suất ăn cho nhân viên.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-gem" />
                      <h4>Tích điểm đổi thưởng</h4>
                      <p>
                        Khách hàng được tích điểm mỗi lần đặt món và đổi lấy
                        phần thưởng hấp dẫn.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-xl-4"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                      <i className="bi bi-inboxes" />
                      <h4>Giao hàng nhanh chóng</h4>
                      <p>
                        Đảm bảo suất ăn luôn nóng sốt, giao tận nơi đúng giờ cho
                        khách hàng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="stats section dark-background" id="">
          <img alt="" data-aos="fade-in" src="../src/assets/img/stats-bg.jpg" />
          <div
            className="container position-relative"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    className="purecounter"
                    data-purecounter-duration="1"
                    data-purecounter-end="232"
                    data-purecounter-start="0"
                  />
                  <p>Khách hàng</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    className="purecounter"
                    data-purecounter-duration="1"
                    data-purecounter-end="521"
                    data-purecounter-start="0"
                  />
                  <p>Dự án</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    className="purecounter"
                    data-purecounter-duration="1"
                    data-purecounter-end="1453"
                    data-purecounter-start="0"
                  />
                  <p>Giờ hỗ trợ</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="stats-item text-center w-100 h-100">
                  <span
                    className="purecounter"
                    data-purecounter-duration="1"
                    data-purecounter-end="32"
                    data-purecounter-start="0"
                  />
                  <p>Nhân viên</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="testimonials section light-background"
          id="testimonials"
        >
          <div className="container section-title" data-aos="fade-up">
            <h2>KHÁCH HÀNG NÓI GÌ?</h2>
            <p>
              Họ <span className="description-title">nói gì về chúng tôi</span>
            </p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper init-swiper">
              <script
                className="swiper-config"
                dangerouslySetInnerHTML={{
                  __html:
                    '            {              "loop": true,              "speed": 600,              "autoplay": {                "delay": 5000              },              "slidesPerView": "auto",              "pagination": {                "el": ".swiper-pagination",                "type": "bullets",                "clickable": true              }            }          ',
                }}
                type="application/json"
              />
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left" />
                            <span>
                              Tôi và gia đình đã có một bữa tối đáng nhớ tại
                              O2O. Chắc chắn sẽ quay lại!
                            </span>
                            <i className="bi bi-quote quote-icon-right" />
                          </p>
                          <h3>Sadman</h3>
                          <h4>Ceo & Founder</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          alt=""
                          className="img-fluid testimonial-img"
                          src="../src/assets/img/testimonials/testimonials-1.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left" />
                            <span>
                              Thức ăn tuyệt vời, không gian ấm cúng và phục vụ
                              rất tận tình. Tôi và gia đình đã có một bữa tối
                              đáng nhớ tại O2O. Chắc chắn sẽ quay lại!
                            </span>
                            <i className="bi bi-quote quote-icon-right" />
                          </p>
                          <h3>Sarason</h3>
                          <h4>doanh nhân</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          alt=""
                          className="img-fluid testimonial-img"
                          src="../src/assets/img/testimonials/testimonials-2.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left" />
                            <span>
                              Nhà hàng sạch sẽ, món ăn trình bày đẹp mắt và
                              hương vị tuyệt vời. Nhân viên thân thiện, luôn sẵn
                              sàng hỗ trợ khách hàng. Rất hài lòng!
                            </span>
                            <i className="bi bi-quote quote-icon-right" />
                          </p>
                          <h3>Jenrlis</h3>
                          <h4>doanh nhân</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          alt=""
                          className="img-fluid testimonial-img"
                          src="../src/assets/img/testimonials/testimonials-3.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="row gy-4 justify-content-center">
                      <div className="col-lg-6">
                        <div className="testimonial-content">
                          <p>
                            <i className="bi bi-quote quote-icon-left" />
                            <span>
                              Đây là địa điểm lý tưởng để tổ chức tiệc sinh nhật
                              hoặc gặp mặt bạn bè. Giá cả hợp lý, thực đơn đa
                              dạng và chất lượng dịch vụ xuất sắc.
                            </span>
                            <i className="bi bi-quote quote-icon-right" />
                          </p>
                          <h3>LAnh</h3>
                          <h4>doanh nhân</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <img
                          alt=""
                          className="img-fluid testimonial-img"
                          src="../src/assets/img/testimonials/testimonials-4.jpg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>
        <section className="events section" id="events">
          <div
            className="container-fluid"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="swiper init-swiper">
              <script
                className="swiper-config"
                dangerouslySetInnerHTML={{
                  __html:
                    '            {              "loop": true,              "speed": 600,              "autoplay": {                "delay": 5000              },              "slidesPerView": "auto",              "pagination": {                "el": ".swiper-pagination",                "type": "bullets",                "clickable": true              },              "breakpoints": {                "320": {                  "slidesPerView": 1,                  "spaceBetween": 40                },                "1200": {                  "slidesPerView": 3,                  "spaceBetween": 1                }              }            }          ',
                }}
                type="application/json"
              />
              <div className="swiper-wrapper">
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{
                    backgroundImage: "url(../src/assets/img/events-1.jpg)",
                  }}
                >
                  <h3>Đối Tác Doanh Nghiệp</h3>
                  <div className="price align-self-start">
                    Hợp tác linh hoạt
                  </div>
                  <p className="description">
                    O2OCOM.AI đồng hành cùng các doanh nghiệp trong việc cung
                    cấp suất ăn văn phòng chất lượng, tối ưu chi phí và nâng cao
                    phúc lợi cho nhân viên. Liên hệ để nhận ưu đãi hợp tác dài
                    hạn!
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{
                    backgroundImage: "url(../src/assets/img/events-2.jpg)",
                  }}
                >
                  <h3>Nhà Cung Cấp Ẩm Thực</h3>
                  <div className="price align-self-start">
                    Kết nối cùng phát triển
                  </div>
                  <p className="description">
                    Chúng tôi luôn tìm kiếm các bếp trung tâm, nhà hàng, đầu bếp
                    tài năng để mở rộng mạng lưới phục vụ. Hợp tác cùng
                    O2OCOM.AI để tiếp cận thêm nhiều khách hàng mới!
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{
                    backgroundImage: "url(../src/assets/img/events-3.jpg)",
                  }}
                >
                  <h3>Đối Tác Công Nghệ</h3>
                  <div className="price align-self-start">
                    Chia sẻ giải pháp
                  </div>
                  <p className="description">
                    O2OCOM.AI sẵn sàng hợp tác với các đơn vị công nghệ, thanh
                    toán, logistics để nâng cao trải nghiệm khách hàng và tối ưu
                    vận hành. Cùng nhau tạo nên hệ sinh thái số hiện đại!
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{
                    backgroundImage: "url(../src/assets/img/events-4.jpg)",
                  }}
                >
                  <h3>Tổ Chức Sự Kiện</h3>
                  <div className="price align-self-start">
                    Đồng hành tổ chức
                  </div>
                  <p className="description">
                    Hợp tác tổ chức các sự kiện, hội thảo, workshop về ẩm thực,
                    sức khỏe, công nghệ O2O. Cùng lan tỏa giá trị và xây dựng
                    cộng đồng khách hàng bền vững.
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{
                    backgroundImage: "url(../src/assets/img/events-5.png)",
                  }}
                >
                  <h3>Đối Tác Truyền Thông</h3>
                  <div className="price align-self-start">
                    Quảng bá thương hiệu
                  </div>
                  <p className="description">
                    Cùng hợp tác truyền thông, quảng bá dịch vụ và sản phẩm
                    O2OCOM.AI đến đông đảo khách hàng, tạo nên giá trị cộng
                    hưởng cho cả hai bên.
                  </p>
                </div>
                <div
                  className="swiper-slide event-item d-flex flex-column justify-content-end"
                  style={{
                    backgroundImage: "url(../src/assets/img/events-6.jpg)",
                  }}
                >
                  <h3>Đối Tác Phát Triển Bền Vững</h3>
                  <div className="price align-self-start">Vì cộng đồng</div>
                  <p className="description">
                    O2OCOM.AI ưu tiên hợp tác với các tổ chức, doanh nghiệp
                    hướng đến phát triển bền vững, bảo vệ môi trường và nâng cao
                    chất lượng cuộc sống.
                  </p>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Introduce;
