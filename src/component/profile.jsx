import React, { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const username = payload.sub;

      const fetchUser = async () => {
        try {
          const res = await fetch(`http://192.168.102.10:8000/auth/users/${username}`);

          if (res.ok) {
            const data = await res.json();
            setUser(data);
            setFormData({
              full_name: data.full_name,
              email: data.email,
              phone: data.phone,
            });
          }
        } catch {
          console.error("Lỗi kết nối khi lấy thông tin tài khoản");
        }
      };

      fetchUser();
    } catch {
      console.error("Lỗi giải mã token");
    }
  }, []);

  const handleEditClick = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    setShowForm(false);
  };

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <>
      <h4 className="mb-4">Thông tin tài khoản</h4>
      {!showForm ? (
        <>
          <p><strong>Họ tên:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Số điện thoại:</strong> {user.phone}</p>
          <p><strong>Cấp bậc:</strong> {user.level}</p>
          <p><strong>Điểm thưởng:</strong> {user.points}</p>

          <button className="btn btn-primary mt-3" onClick={handleEditClick}>
            Chỉnh sửa thông tin
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Họ tên</label>
            <input
              type="text"
              name="full_name"
              className="form-control"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">Lưu</button>
          <button type="button" className="btn btn-secondary" onClick={handleEditClick}>
            Hủy
          </button>
        </form>
      )}
    </>
  );
}

export default Profile;
