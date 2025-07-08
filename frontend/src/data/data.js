// src/data.js

export const categories = [
  "Tất cả",
  "Khai vị",
  "Bữa sáng",
  "Bữa trưa",
  "Bữa tối",
  "Combo",
];
export const dishTypes = [
  { id: 1, name: "Cơm" },
  { id: 2, name: "Bánh mì" },
  { id: 3, name: "Bún" },
  { id: 4, name: "Cháo" },
  { id: 5, name: "Mì" },
  { id: 6, name: "Súp" },
  { id: 7, name: "Gỏi cuốn" },
  { id: 8, name: "Combo" },
];


export const allProducts = [
  {
    product_id: 1,
    name: "Gỏi cuốn tôm thịt",
    description: "Khai vị nhẹ nhàng",
    price: 30000,
    image_url: "../src/assets/img/menu/comga1.jpg",
    stock_quantity: 10,
    category: "Khai vị",
    category_id: 1,
    dish_type_id: 7, // Gỏi cuốn
    ingredients: "Tôm, thịt, bún, rau",
    cooking_time_minutes: 10,
    calories: 200,
    discount_percent: 5,
  },
  {
    product_id: 2,
    name: "Súp cua",
    description: "Món khai vị bổ dưỡng",
    price: 35000,
    image_url: "../src/assets/img/menu/comga2.jpeg",
    stock_quantity: 8,
    category: "Khai vị",
    category_id: 1,
    dish_type_id: 6, // Súp
    ingredients: "Cua, nấm, bắp",
    cooking_time_minutes: 12,
    calories: 180,
    discount_percent: 0,
  },
  {
    product_id: 3,
    name: "Bánh mì ốp la",
    description: "Bữa sáng nhanh gọn",
    price: 25000,
    image_url: "../src/assets/img/menu/comga3.jpg",
    stock_quantity: 20,
    category: "Bữa sáng",
    category_id: 2,
    dish_type_id: 2, // Bánh mì
    ingredients: "Trứng, bánh mì, bơ",
    cooking_time_minutes: 5,
    calories: 300,
    discount_percent: 0,
  },
  {
    product_id: 4,
    name: "Bún bò Huế",
    description: "Đậm đà hương vị Huế",
    price: 50000,
    image_url: "../src/assets/img/menu/comga4.png",
    stock_quantity: 6,
    category: "Bữa sáng",
    category_id: 2,
    dish_type_id: 3, // Bún
    ingredients: "Bò, bún, rau",
    cooking_time_minutes: 20,
    calories: 600,
    discount_percent: 10,
  },
  {
    product_id: 5,
    name: "Cơm gà xối mỡ",
    description: "Giòn tan, thơm ngon",
    price: 55000,
    image_url: "../src/assets/img/menu/comga5.jpg",
    stock_quantity: 12,
    category: "Bữa trưa",
    category_id: 3,
    dish_type_id: 1, // Cơm
    ingredients: "Gà, cơm, nước mắm",
    cooking_time_minutes: 15,
    calories: 650,
    discount_percent: 0,
  },
  {
    product_id: 6,
    name: "Cơm sườn nướng",
    description: "Sườn nướng đậm vị",
    price: 58000,
    image_url: "../src/assets/img/menu/comga6.jpg",
    stock_quantity: 10,
    category: "Bữa trưa",
    category_id: 3,
    dish_type_id: 1, // Cơm
    ingredients: "Sườn, cơm, dưa leo",
    cooking_time_minutes: 18,
    calories: 700,
    discount_percent: 5,
  },
  {
    product_id: 7,
    name: "Bò lúc lắc + Cơm",
    description: "Thịt mềm, vị đậm",
    price: 65000,
    image_url: "../src/assets/img/menu/comga7.jpg",
    stock_quantity: 15,
    category: "Bữa tối",
    category_id: 4,
    dish_type_id: 1, // Cơm
    ingredients: "Bò, hành tây, cơm",
    cooking_time_minutes: 20,
    calories: 750,
    discount_percent: 10,
  },
  {
    product_id: 8,
    name: "Cơm chiên Dương Châu",
    description: "Đầy màu sắc, đủ dinh dưỡng",
    price: 52000,
    image_url: "../src/assets/img/menu/comga8.jpg",
    stock_quantity: 14,
    category: "Bữa tối",
    category_id: 4,
    dish_type_id: 1, // Cơm
    ingredients: "Cơm, trứng, xúc xích, đậu",
    cooking_time_minutes: 12,
    calories: 500,
    discount_percent: 0,
  },
  {
    product_id: 9,
    name: "Combo cơm + canh + tráng miệng",
    description: "Bữa trưa trọn gói",
    price: 75000,
    image_url: "../src/assets/img/como2o1.png",
    stock_quantity: 10,
    category: "Combo",
    category_id: 5,
    dish_type_id: 8, // Combo
    ingredients: "Cơm, canh chua, rau xào, trái cây",
    cooking_time_minutes: 20,
    calories: 800,
    discount_percent: 15,
  },
  {
    product_id: 10,
    name: "Combo ăn sáng nhanh",
    description: "Đầy đủ năng lượng",
    price: 40000,
    image_url: "../src/assets/img/como2o2.png",
    stock_quantity: 25,
    category: "Combo",
    category_id: 5,
    dish_type_id: 8, // Combo
    ingredients: "Bánh mì, sữa đậu nành",
    cooking_time_minutes: 5,
    calories: 350,
    discount_percent: 10,
  },
];


export const adsProducts = [
  {
    id: 1,
    title: "Ưu đãi Combo siêu tiết kiệm",
    link: "#",
  },
  {
    id: 2,
    title: "Bữa sáng chỉ từ 25K",
    link: "#",
  },
  {
    id: 3,
    title: "Giảm 20% cho đơn đầu tiên",
    link: "#",
  },
  {
    id: 4,
    title: "Miễn phí giao hàng nội thành",
    link: "#",
  },
  {
    id: 5,
    title: "Combo gia đình 4 người",
    link: "#",
  },
];

export const newsCategories = ["Ẩm thực", "Sự kiện", "Khuyến mãi", "Tin tức"];

export const allNews = [
  {
    id: 1,
    title: "Khai trương chi nhánh mới tại TP.HCM",
    image: "../src/assets/img/events-1.jpg",
    description:
      "Chúng tôi vui mừng thông báo khai trương chi nhánh mới tại trung tâm TP.HCM.",
    date: "01/07/2025",
    category: "Sự kiện",
    content: `O2OCOM chính thức khai trương chi nhánh mới tại Quận 1. Trong tuần lễ khai trương, thực khách sẽ được giảm giá 20% tất cả các món ăn.`,
  },
  {
    id: 2,
    title: "Thực đơn tháng 7 siêu hấp dẫn",
    image: "../src/assets/img/events-2.jpg",
    description:
      "Khám phá những món ăn hấp dẫn trong thực đơn tháng 7 tại O2OCOM.",
    date: "28/06/2025",
    category: "Ẩm thực",
    content: `Thực đơn mới tháng 7 với các món hải sản cao cấp, rau hữu cơ và các món ăn fusion mới lạ.`,
  },
  {
    id: 3,
    title: "Chương trình giảm giá 30% dành cho hội viên",
    image: "../src/assets/img/events-3.jpg",
    description: "Đặc quyền dành riêng cho hội viên thân thiết của O2OCOM.",
    date: "20/06/2025",
    category: "Khuyến mãi",
    content: `Hội viên O2OCOM sẽ được giảm giá 30% hóa đơn từ 20/6 đến 31/7/2025.`,
  },
  {
    id: 4,
    title: "Tuyển dụng nhân sự mùa hè",
    image: "../src/assets/img/events-4.jpg",
    description: "Cơ hội làm việc tại môi trường năng động",
    date: "15/06/2025",
    category: "Tin tức",
    content: `O2OCOM đang tuyển dụng các vị trí: phục vụ, bếp chính, shipper... tại nhiều chi nhánh trên cả nước.`,
  },
  {
    id: 5,
    title: "Giao diện website mới siêu mượt",
    image: "../src/assets/img/events-5.png",
    description: "Trải nghiệm đặt món dễ dàng hơn bao giờ hết!",
    date: "10/06/2025",
    category: "Tin tức",
    content: `Website O2OCOM chính thức nâng cấp với giao diện thân thiện, tốc độ nhanh và hỗ trợ QR order.`,
  },
  {
    id: 6,
    title: "Khám phá món ăn mới lạ mỗi tuần",
    image: "../src/assets/img/events-6.jpg",
    description: "Mỗi tuần 1 món độc quyền từ đầu bếp O2OCOM",
    date: "03/06/2025",
    category: "Ẩm thực",
    content: `Từ tháng 6, O2OCOM giới thiệu chương trình "Món ăn tuần lễ" với công thức độc quyền chưa từng có.`,
  },
];
