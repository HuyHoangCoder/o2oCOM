from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
from app.db.database import Base, engine
from app.routes import (
    admin_orders,
    admin_product_origin,
    auth,
    ingredients,
    orders,
    # payments,
    product,
    product_ingredients,
    users,
    category,
    wishlist,
    notification,
    admin_user,
    admin_orders,
    admin_order_details,
    admin_payment_logs,
    product_detail,
    sales_summary,
)

import os

load_dotenv()

app = FastAPI()

# ✅ Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Khuyến nghị khi triển khai thực tế nên cụ thể domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ SessionMiddleware cho OAuth
app.add_middleware(SessionMiddleware, secret_key=os.getenv("SECRET_KEY"))

# ✅ Tạo bảng DB nếu chưa có
Base.metadata.create_all(bind=engine)

# ✅ Route mặc định
@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

# ✅ Import các router với prefix rõ ràng
app.include_router(auth.router, prefix="/auth")
app.include_router(product.router, prefix="/products")
app.include_router(users.router, prefix="/users")
app.include_router(category.router, prefix="/categories")
app.include_router(wishlist.router, prefix="/wishlist")
app.include_router(notification.router, prefix="/notifications")
app.include_router(orders.router, prefix="/orders")
app.include_router(admin_orders.router, prefix="/admin/orders")
# app.include_router(payments.router, prefix="/payments")
app.include_router(admin_product_origin.router, prefix="/admin/product-origins")
app.include_router(product_ingredients.router, prefix="/admin/product-ingredients")
app.include_router(ingredients.router, prefix="/ingredients")
app.include_router(admin_user.router, prefix="/admin/user")
app.include_router(admin_order_details.router, prefix="/admin/order-details")
app.include_router(admin_payment_logs.router, prefix="/admin/payment-logs")
app.include_router(product_detail.router, prefix="/product-details")
app.include_router(sales_summary.router, prefix="/sales-summary")