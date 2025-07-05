import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Nhà riêng",
      address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      phone: "0909 123 456",
      isDefault: true,
    },
    {
      id: 2,
      name: "Văn phòng",
      address: "456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      phone: "0902 987 654",
      isDefault: false,
    },
  ]);

  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.address || !form.phone) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (isEditing) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editId ? { ...addr, ...form } : addr))
      );
      toast.success("Đã cập nhật địa chỉ!");
    } else {
      const newAddress = {
        id: Date.now(),
        ...form,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddress]);
      toast.success("Đã thêm địa chỉ mới!");
    }

    setForm({ name: "", address: "", phone: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (addr) => {
    setForm({ name: addr.name, address: addr.address, phone: addr.phone });
    setIsEditing(true);
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Đã xóa địa chỉ!");
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">Địa chỉ giao hàng</h4>

      {addresses.length === 0 ? (
        <p>Chưa có địa chỉ nào.</p>
      ) : (
        addresses.map((addr) => (
          <div key={addr.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-2">
                {addr.name}{" "}
                {addr.isDefault && (
                  <span className="badge bg-success">Mặc định</span>
                )}
              </h5>
              <p className="mb-1">
                <i className="bi bi-geo-alt me-2"></i>
                {addr.address}
              </p>
              <p>
                <i className="bi bi-telephone me-2"></i>
                {addr.phone}
              </p>
              <button
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => handleEdit(addr)}
              >
                Chỉnh sửa
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(addr.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={() => {
          setForm({ name: "", address: "", phone: "" });
          setIsEditing(false);
          setEditId(null);
          setShowForm(true);
        }}
      >
        Thêm địa chỉ mới
      </button>

      {showForm && (
        <div className="card p-3 shadow-sm mt-3">
          <h5>{isEditing ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h5>
          <div className="mb-2">
            <label className="form-label">Tên địa chỉ</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Địa chỉ chi tiết</label>
            <input
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Số điện thoại</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleAddOrUpdate}>
              {isEditing ? "Cập nhật" : "Thêm mới"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Addresses;
