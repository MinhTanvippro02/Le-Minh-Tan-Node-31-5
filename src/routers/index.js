const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("../controllers/user.controller");
const ProductController = require("../controllers/product.controller");

//const userController = require("../controllers/user.controller");

router.use("/api/v1/product", require("./product/index"));
router.use("/api/v1/user", require("./user/index"));
// Middleware để kiểm tra đăng nhập
const checkAdminLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/admin/login"); // Chuyển hướng nếu chưa đăng nhập
  }
  next();
};

router.get("/", async (req, res) => {
  const indexView = path.join(__dirname, "../views/index.ejs");
  const products = await ProductController.getListProduct();
  res.render(indexView, { data: products });
});
// Trang chủ admin
router.get("/admin", checkAdminLogin, async (req, res) => {
  const indexView = path.join(__dirname, "../views/admin.ejs");
  res.render(indexView, { user: req.session.user });
});
//Trang quan ly san pham
router.get("/admin/products", async (req, res) => {
  const productView = path.join(__dirname, "../views/product-manage.ejs");
  const products = await ProductController.getListProduct();
  res.render(productView, { data: products });
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const indexView = path.join(__dirname, "../views/product-details.ejs");
  const product = await ProductController.getProduct(id);
  res.render(indexView, { product });
});

router.get("/admin/list-product", async (req, res) => {
  const indexView = path.join(__dirname, "../views/admin/product-manage.ejs");
  const products = await ProductController.getListProduct();
  res.render(indexView, { data: products });
});

router.get("/admin/update-products/:id", async (req, res) => {
  const id = req.params.id;
  const indexView = path.join(__dirname, "../views/admin/products.update.ejs");
  const products = await ProductController.getProduct(id);
  // console.log(products);
  res.render(indexView, { products });
});

router.get("/admin/login", async (req, res) => {
  const loginView = path.join(__dirname, "../views/sign-in.ejs");
  res.render(loginView);
});

//Xử lý đăng nhâp
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userController.userLogin(username, password);
  if (user) {
    if (user.role === "Admin") {
      req.session.user = user; // Lưu session
      res.redirect("/admin");
    } else {
      // Sử dụng alert để thông báo lỗi
      res.send(
        '<script>alert("Bạn không có quyền truy cập vào trang admin."); window.location.href = "/admin/login";</script>'
      );
    }
  } else {
    res.send(
      '<script>alert("Sai Username hoặc mật khẩu."); window.location.href = "/admin/login";</script>'
    );
  }
});

// Trang đăng nhập admin
router.get("/admin/login", async (req, res) => {
  const loginView = path.join(__dirname, "../views/sign-in.ejs");
  res.render(loginView);
});

module.exports = router;
