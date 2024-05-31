const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");
const path = require("path");
const { route } = require("..");

// Get list product
router.get("/list-product", productController.getListProduct);

// Get product by id
router.get("/get-product/:id", productController.getProduct);

// Add product
router.post(
  "/add-product",
  //   upload.single("thumbnail"),
  productController.addProduct
);

// Update product
router.post(
  "/update-product/:id",
  //   upload.single("thumbnail"),
  productController.updateProduct
);

// Delete product
router.post("/delete-product/:id", productController.deleteProduct);

module.exports = router;
