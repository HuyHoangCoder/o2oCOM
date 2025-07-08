import React, { useState, useEffect } from "react";
import { allNews, newsCategories } from "../data/data";
import { useNavigate } from "react-router-dom";

function News() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(newsCategories);
    setArticles(allNews);
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      (activeCategory === "Tất cả" || article.category === activeCategory) &&
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="main">
      <section className="news section mt-3">
        <div className="container">
          <div className="container section-title" data-aos="fade-up">
            <h2>Bài viết & Tin tức</h2>
            <p>
              <span className="description-title">Bài viết & Tin tức </span>
              <span> mới nhất</span>
            </p>
          </div>
          <div className="row">
            {/* Cột trái: Danh mục bài viết */}
            <div className="col-md-3 mb-3">
              <div className="card shadow-sm mb-3">
                <div className="card-header fw-bold">Danh mục</div>
                <ul className="list-group list-group-flush">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`list-group-item ${activeCategory === cat ? "active text-white" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                      }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cột phải: Danh sách bài viết */}
            <div className="col-md-9">
              <div className="d-flex justify-content-between mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm bài viết..."
                  style={{ maxWidth: "300px" }}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="row gy-3">
                {paginatedArticles.map((article) => (
                  <div className="col-12 col-md-6 mb-3" key={article.id}>
                    <div className="card h-100 shadow-sm">
                      <img src={article.image} className="card-img-top" alt={article.title} />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{article.title}</h5>
                        <small className="text-muted mb-2">{article.date} - {article.category}</small>
                        <p className="card-text flex-grow-1">{article.description}</p>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => navigate(`/news/${article.id}`)}
                        >
                          Đọc thêm
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phân trang */}
              <div className="d-flex justify-content-center mt-3">
                <nav>
                  <ul className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default News;
