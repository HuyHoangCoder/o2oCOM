// src/data.js
// src/data.js

export const categories = ["Tất cả", "Combo", "Cơm"];

export const allProducts = [
  {
    product_id: 1,
    name: "Cơm gà",
    description: "Ngon bổ dưỡng",
    price: 45000,
    image_url: "../src/assets/img/menu/comga1.jpg",
    stock_quantity: 5,
    category: "Bữa trưa",
    category_id: 2,
    ingredients: "Gà, cơm, rau",
    cooking_time_minutes: 15,
    calories: 550,
    discount_percent: 10,
  },
  {
    product_id: 2,
    name: "Bún bò",
    description: "Hương vị Huế",
    price: 50000,
    image_url: "../src/assets/img/menu/comga2.jpeg",
    stock_quantity: 3,
    category: "Bữa sáng",
    category_id: 1,
    ingredients: "Bò, bún, rau",
    cooking_time_minutes: 20,
    calories: 600,
    discount_percent: 0,
  },
  {
    product_id: 3,
    name: "Cơm sườn",
    description: "Thơm ngon đậm đà",
    price: 55000,
    image_url: "../src/assets/img/menu/comga3.jpg",
    stock_quantity: 7,
    category: "Bữa trưa",
    category_id: 2,
    ingredients: "Sườn, cơm, rau",
    cooking_time_minutes: 18,
    calories: 650,
    discount_percent: 0,
  },
];


export const adsProducts = [
  { id: 1, title: "Ưu đãi Combo siêu tiết kiệm", image: "../src/assets/img/menu/comga5.jpg", link: "#" },
  { id: 2, title: "Bữa sáng chỉ từ 25K", image: "../src/assets/img/menu/comga4.png", link: "#" },
];

export const featuredDishes = [
  { product_id: 1, name: "Cơm gà", description: "Ngon và bổ dưỡng", price: 45000, image_url: "../src/assets/img/menu/comga7.jpg", stock_quantity: 5, is_best_seller: true },
  { product_id: 2, name: "Bún bò", description: "Đậm đà hương vị Huế", price: 50000, image_url: "../src/assets/img/menu/comga8.jpg", stock_quantity: 0, is_best_seller: false },
];

export const comboDishes = [
  { product_id: 3, name: "Combo 1", description: "Cơm + nước", price: 70000, image_url: "../src/assets/img/menu/comga3.jpg", stock_quantity: 10 },
];

export const starters = [
  { product_id: 4, name: "Salad", description: "Rau sạch tươi ngon", price: 30000, image_url: "../src/assets/img/menu/comga2.jpg", stock_quantity: 8 },
];

export const breakfast = [
  { product_id: 5, name: "Bánh mì", description: "Bánh mì Việt Nam", price: 25000, image_url: "../src/assets/img/menu/comga7.jpg", stock_quantity: 12 },
];

export const lunch = [
  { product_id: 6, name: "Phở bò", description: "Đặc sản Hà Nội", price: 55000, image_url: "../src/assets/img/menu/comga1.jpg", stock_quantity: 7 },
];

export const dinner = [
  { product_id: 7, name: "Lẩu Thái", description: "Cay nồng hấp dẫn", price: 150000, image_url: "../src/assets/img/menu/comga2.jpeg", stock_quantity: 3 },
];

export const bestSellers = featuredDishes.filter((item) => item.is_best_seller);


// src/data/data.js

export const newsCategories = ["Tất cả", "Tin tức", "Khuyến mãi", "Cẩm nang"];

export const allNews = [
  {
    id: 1,
    title: "O2OCOM ra mắt tính năng mới",
    description: "Khám phá tính năng đặt món nhanh chóng và tiện lợi hơn bao giờ hết.",
    image: "../src/assets/img/events-1.jpg",
    category: "Tin tức",
    date: "2025-07-01",
  },
  {
    id: 2,
    title: "Khuyến mãi Combo mùa hè",
    description: "Tiết kiệm tới 30% cho tất cả combo buổi trưa từ nay đến hết tháng.",
    image: "../src/assets/img/events-2.jpg",
    category: "Khuyến mãi",
    date: "2025-07-03",
  },
  {
    id: 3,
    title: "5 bí quyết ăn trưa lành mạnh",
    description: "Gợi ý từ chuyên gia để duy trì sức khỏe với các suất ăn văn phòng.",
    image: "../src/assets/img/events-3.jpg",
    category: "Cẩm nang",
    date: "2025-06-28",
  },
];
