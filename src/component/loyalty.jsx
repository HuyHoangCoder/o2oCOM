import React from "react";

function Loyalty() {
  const points = 50;
  const currentRank = "Khách hàng thân thiết";
  const nextRank = "Bạc";
  const pointsToNextRank = 50;
  const totalPointsForNextRank = 200;
  const progressPercent = (points / totalPointsForNextRank) * 100;

  return (
    <div className="container py-4">
      <h4 className="mb-4">Điểm thưởng & Cấp bậc</h4>

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">Điểm tích lũy</h5>
        <p className="fs-4 text-orange fw-bold">{points} điểm</p>

        {/* <div className="progress mb-2" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.min(progressPercent, 100).toFixed(0)}%
          </div>
        </div>
        <p>
          {points} / {totalPointsForNextRank} điểm để đạt cấp{" "}
          <strong>{nextRank}</strong>
        </p> */}
      </div>

      <div className="card shadow-sm p-4">
        <h5 className="fw-bold mb-3">Cấp bậc hiện tại: {currentRank}</h5>
        <ul className="list-unstyled mb-3">
          <li>
            <i className="bi bi-check-circle text-success me-2"></i>
            Miễn phí giao hàng cho đơn từ 200.000₫
          </li>
          <li>
            <i className="bi bi-check-circle text-success me-2"></i>
            Ưu đãi sinh nhật
          </li>
          <li>
            <i className="bi bi-check-circle text-success me-2"></i>
            Đổi điểm lấy mã giảm giá
          </li>
        </ul>
        <button className="btn btn-outline-primary btn-sm">
          Đổi điểm ngay
        </button>
      </div>
    </div>
  );
}

export default Loyalty;
