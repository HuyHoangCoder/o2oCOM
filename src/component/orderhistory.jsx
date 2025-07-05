import React from "react";

function OrderHistory() {
  const orders = [
    {
      id: "DH001",
      date: "2024-06-28",
      status: "Đã giao",
      total: "250,000₫",
      items: [
        {
          name: "Cơm Gà Quay",
          image: "../src/assets/img/menu/comga5.jpg",
          quantity: 2,
        },
        {
          name: "Cơm Xối Mỡ",
          image: "../src/assets/img/menu/comga5.jpg",
          quantity: 1,
        },
      ],
    },
    {
      id: "DH002",
      date: "2024-06-26",
      status: "Đang xử lý",
      total: "150,000₫",
      items: [
        {
          name: "Cơm Gà BBQ",
          image: "../src/assets/img/menu/comga5.jpg",
          quantity: 1,
        },
      ],
    },
    {
      id: "DH003",
      date: "2024-06-20",
      status: "Đã hủy",
      total: "180,000₫",
      items: [
        {
          name: "Cơm Xối Mỡ",
          image: "../src/assets/img/menu/comga5.jpg",
          quantity: 3,
        },
      ],
    },
  ];

  return (
    <div className="container py-4">
      <h4 className="mb-4">Lịch sử đặt hàng</h4>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">
                Mã đơn: <strong>{order.id}</strong>
              </h5>
              <p>Ngày đặt: {order.date}</p>
              <p>
                Trạng thái:{" "}
                {order.status === "Đã giao" && (
                  <span className="text-success">{order.status}</span>
                )}
                {order.status === "Đang xử lý" && (
                  <span className="text-warning">{order.status}</span>
                )}
                {order.status === "Đã hủy" && (
                  <span className="text-danger">{order.status}</span>
                )}
              </p>
              <p>Tổng tiền: {order.total}</p>

              <h6 className="mt-3">Sản phẩm:</h6>
              <div className="row g-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-4 d-flex align-items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      className="me-3 rounded"
                    />
                    <div>
                      <p className="mb-1">{item.name}</p>
                      <small>Số lượng: {item.quantity}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
