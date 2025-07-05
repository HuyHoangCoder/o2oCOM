import React, { useState } from "react";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp!");
      return;
    }
    alert("Đổi mật khẩu thành công (mô phỏng)");
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <>
      <h4 className="mb-4">Đổi mật khẩu</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mật khẩu hiện tại</label>
          <input
            type="password"
            name="currentPassword"
            className="form-control"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Đổi mật khẩu
        </button>
      </form>
    </>
  );
}

export default ChangePassword;
