import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { allNews } from "../data/data";

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = allNews.find((item) => item.id === parseInt(id));

  if (!article) {
    return (
      <div className="container py-4">
        <h4>Không tìm thấy bài viết.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav className="mb-3">
        <Link to="/" className="text-decoration-none">Trang chủ</Link> /{" "}
        <Link to="/news" className="text-decoration-none">Tin tức</Link> /{" "}
        <span className="fw-bold">{article.title}</span>
      </nav>

      {/* Nội dung bài viết */}
      <div className="row gy-4">
        <div className="col-md-8">
          <h2 className="fw-bold mb-3">{article.title}</h2>
          <small className="text-muted mb-3 d-block">{article.date} - {article.category}</small>
          <img src={article.image} alt={article.title} className="img-fluid rounded mb-4" />
          <p>{article.description}</p>
          <div className="mt-4" style={{ lineHeight: "1.8" }}>
            {article.content}
          </div>
        </div>

        {/* Cột phải: Bài viết liên quan */}
        <div className="col-md-4">
          <h5 className="fw-bold mb-3">Bài viết liên quan</h5>
          {allNews
            .filter((item) => item.id !== article.id && item.category === article.category)
            .slice(0, 3)
            .map((related) => (
              <div key={related.id} className="mb-3 border-bottom pb-2">
                <Link to={`/news/${related.id}`} className="text-decoration-none">
                  <h6 className="fw-semibold mb-1">{related.title}</h6>
                  <small className="text-muted">{related.date}</small>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
