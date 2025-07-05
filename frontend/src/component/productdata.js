const allProducts = [
  { id: 1, name: "Cơm Gà Quay", desc: "Gà quay da giòn, cơm trắng, rau củ", price: "65.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Nổi bật" ,category: "Cơm"},
  { id: 2, name: "Cơm Xối Mỡ", desc: "Gà chiên xối mỡ, cơm vàng, nước sốt đặc biệt", price: "60.000₫", img: "../src/assets/img/menu/comga5.jpg", outOfStock: true, categorydish: "Nổi bật" ,category: "Cơm"},
  { id: 3, name: "Cơm Gà BBQ", desc: "Gà nướng BBQ, cơm trắng, rau củ", price: "70.000₫", img: "../src/assets/img/menu/comga5.jpg" ,category: ""},
  { id: 4, name: "Salad Rau Trộn", desc: "Tươi ngon, nhiều vitamin", price: "40.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Khai vị" ,category: "Salad"},
  { id: 5, name: "Bánh Mì Ốp La", desc: "Bánh mì + trứng ốp la", price: "25.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Bữa sáng" ,category: "Bánh mì"},
  { id: 6, name: "Cơm Sườn Nướng", desc: "Sườn nướng, cơm trắng", price: "75.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Bữa trưa" ,category: "Cơm"},
  { id: 7, name: "Phở Bò", desc: "Phở bò truyền thống", price: "50.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Bữa tối" ,category: "Phở"},
  { id: 8, name: "Cơm Gà Quay", desc: "Best seller", price: "65.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Bán chạy" ,category: "Cơm"},
  { id: 9, name: "Combo Gà BBQ", desc: "Gà BBQ + Nước + Tráng miệng", price: "120.000₫", img: "../src/assets/img/menu/comga5.jpg", categorydish: "Combo" ,category: "Combo"},
];


const categories = [
  "Tất cả",
  "Combo",
  "Cơm",
  "Salad",
  "Bánh mì",
  "Phở",
];

const comboDishes = allProducts.filter(p => p.categorydish === "Combo");
const starters = allProducts.filter(p => p.categorydish === "Khai vị");
const breakfast = allProducts.filter(p => p.categorydish === "Bữa sáng");
const lunch = allProducts.filter(p => p.categorydish === "Bữa trưa");
const dinner = allProducts.filter(p => p.categorydish === "Bữa tối");
const bestSellers = allProducts.filter(p => p.categorydish === "Bán chạy");
const featuredDishes = allProducts.filter(p => p.categorydish === "Nổi bật");

export {
  allProducts,
  comboDishes,
  starters,
  breakfast,
  lunch,
  dinner,
  bestSellers,
  featuredDishes,
  categories
};
