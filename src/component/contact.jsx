import React from "react";

function Contact() {
  return (
    <>
      <main className="main">
        <section className="contact section" id="contact">
          <div className="container section-title" data-aos="fade-up">
            <h2>Liên hệ</h2>
            <p>
              <span>Cần hỗ trợ?</span>{" "}
              <span className="description-title">Liên hệ với chúng tôi</span>
            </p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="mb-5">
              <iframe
                allowFullScreen
                frameBorder="0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d490.0118384388634!2d106.67802960166881!3d10.727178389116077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f004a7914ed%3A0xfcb9fc1fa81afba5!2zUGjDsm5nIEdZTSBOaOG6rXQgVMOibg!5e0!3m2!1svi!2s!4v1748249238192!5m2!1svi!2s"
                style={{
                  height: "400px",
                  width: "100%",
                }}
              />
            </div>
            <div className="row gy-4">
              <div className="col-md-6">
                <div
                  className="info-item d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="icon bi bi-geo-alt flex-shrink-0" />
                  <div>
                    <h3>Địa chỉ</h3>
                    <p>
                      C11/C12 Chanh, Đ. Phạm Hùng, Bình Hưng, Bình Chánh, Hồ Chí
                      Minh, Việt Nam
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="info-item d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="icon bi bi-telephone flex-shrink-0" />
                  <div>
                    <h3>Gọi cho chúng tôi</h3>
                    <p>+0909 XXX XXX</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="info-item d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="icon bi bi-envelope flex-shrink-0" />
                  <div>
                    <h3>Email</h3>
                    <p>join@o2ocom.ai</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="info-item d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <i className="icon bi bi-clock flex-shrink-0" />
                  <div>
                    <h3>
                      Giờ mở cửa
                      <br />
                    </h3>
                    <p>
                      <strong>Thứ 2-Thứ 7:</strong> 11h - 23h;{" "}
                      <strong>Chủ nhật:</strong> Đóng cửa
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <form
              action="forms/contact.php"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="600"
              method="post"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Tên của bạn"
                    required
                    type="text"
                  />
                </div>
                <div className="col-md-6 ">
                  <input
                    className="form-control"
                    name="email"
                    placeholder="Email của bạn"
                    required
                    type="email"
                  />
                </div>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    name="subject"
                    placeholder="Chủ đề"
                    required
                    type="text"
                  />
                </div>
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Nội dung"
                    required
                    rows="6"
                  />
                </div>
                <div className="col-md-12 text-center">
                  <div className="loading">Đang gửi...</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Tin nhắn của bạn đã được gửi. Xin cảm ơn!
                  </div>
                  <button type="submit">Gửi tin nhắn</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Contact;
