

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
    category_id: 3,
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
    category_id: 3,
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
    category_id: 3,
    ingredients: "Sườn, cơm, rau",
    cooking_time_minutes: 18,
    calories: 650,
    discount_percent: 0,
  },
  {
  product_id: 4,
  name: "Cơm chiên hải sản",
  image_url: "../src/assets/img/menu/menu-item-4.png",
  price: 65000,
  description: "Cơm chiên thơm ngon hải sản",
  category: "Cơm Chiên",
  category_id: 3,
  ingredients: "Tôm, mực, trứng, cơm",
  cooking_time_minutes: 15,
  calories: 450,
  stock_quantity: 20,
  discount_percent: 10
}

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
  { product_id: 4, name: "Salad", description: "Rau sạch tươi ngon", price: 30000, image_url: "../src/assets/img/menu/comga2.jpeg", stock_quantity: 8 },
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

export const newsCategories = ["Ẩm thực", "Sự kiện", "Khuyến mãi", "Tin tức"];

export const allNews = [
  {
    id: 1,
    title: "Khai trương chi nhánh mới tại TP.HCM",
    image: "../src/assets/img/events-1.jpg",
    description: "Chúng tôi vui mừng thông báo khai trương chi nhánh mới tại trung tâm TP.HCM.",
    date: "01/07/2025",
    category: "Sự kiện",
    content: `Sáng ngày 1/7/2025, O2OCOM chính thức khai trương chi nhánh mới tại Quận 1, TP.HCM. Với không gian hiện đại, thực đơn phong phú và đội ngũ nhân viên chuyên nghiệp, chúng tôi hy vọng sẽ phục vụ khách hàng tốt nhất.\n\nĐặc biệt trong tuần lễ khai trương, thực khách sẽ được hưởng ưu đãi giảm giá 20% cho tất cả các món ăn và nước uống.\n\nHân hạnh được đón tiếp quý khách!`
  },
  {
    id: 2,
    title: "Thực đơn tháng 7 siêu hấp dẫn",
    image: "../src/assets/img/events-2.jpg",
    description: "Khám phá những món ăn hấp dẫn trong thực đơn tháng 7 tại O2OCOM.",
    date: "28/06/2025",
    category: "Ẩm thực",
    content: `Bước vào tháng 7, O2OCOM mang đến cho thực khách những món ăn độc đáo, tươi ngon và đầy dinh dưỡng. Thực đơn mới được các đầu bếp sáng tạo với nhiều món ăn từ hải sản tươi sống, thịt bò nhập khẩu và rau củ hữu cơ.\n\nHãy cùng gia đình và bạn bè thưởng thức bữa ăn chất lượng tại O2OCOM.`
  },
  {
    id: 3,
    title: "Chương trình giảm giá 30% dành cho hội viên",
    image: "../src/assets/img/events-3.jpg",
    description: "Đặc quyền dành riêng cho hội viên thân thiết của O2OCOM.",
    date: "20/06/2025",
    category: "Khuyến mãi",
    content: `Từ ngày 20/6 đến hết ngày 31/7/2025, các hội viên của O2OCOM sẽ được hưởng ưu đãi giảm giá 30% trên tổng hóa đơn khi dùng bữa tại nhà hàng.\n\nNhanh tay đăng ký trở thành hội viên để nhận ngay ưu đãi hấp dẫn này!`
  }
];
