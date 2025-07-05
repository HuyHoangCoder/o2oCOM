import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://192.168.102.10:8000/wishlist/wishlist?user_id=${userId}`);
        if (res.ok) {
          const data = await res.json();
          setWishlist(Array.isArray(data) ? data : []);
        } else {
          setWishlist([]);
          toast.error("Không thể lấy danh sách yêu thích!");
        }
      } catch {
        toast.error("Lỗi kết nối máy chủ!");
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemove = async (productId) => {
    try {
      const res = await fetch(
        `http://192.168.102.10:8000/wishlist/wishlist/${productId}?user_id=${userId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setWishlist((prev) => prev.filter((item) => item.product_id !== productId));
        toast.success("Đã xóa khỏi danh sách yêu thích!");
      } else {
        toast.error("Xóa thất bại!");
      }
    } catch {
      toast.error("Lỗi kết nối khi xóa sản phẩm!");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Sản phẩm yêu thích</h4>

      {wishlist.length === 0 ? (
        <p>Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.product_id} className="card shadow-sm mb-3">
            <div className="card-body d-flex align-items-center">
              <img
                src={item.image_url || "https://via.placeholder.com/80"}
                alt={item.name || "Sản phẩm"}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                className="rounded me-3"
              />
              <div className="flex-grow-1">
                <h5 className="mb-1">{item.name || "Tên sản phẩm"}</h5>
                <p className="mb-1 text-orange fw-bold">
                  {item.price != null ? `${item.price.toLocaleString()}₫` : "Đang cập nhật"}
                </p>
              </div>
              <div className="d-flex gap-2">
                <Link to={`/menu/${item.product_id}`} className="btn btn-outline-primary btn-sm">
                  Xem sản phẩm
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemove(item.product_id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Wishlist;
