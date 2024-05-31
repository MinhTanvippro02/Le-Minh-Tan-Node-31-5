const ProductModel = require("../models/product.model");

class ProductController {
  async getListProduct(req, res) {
    const products = await ProductModel.find();
    // return res.json(products);
    // console.log(products);
    return products;
  }
  // async getProduct(req, res) {
  //     const product = await ProductModel.findById(req.params._id);
  //     return res.json(product);
  // }
  async getProduct(id) {
    const products = await ProductModel.findById(id);
    // console.log(products);
    return products;
  }
  async addProduct(req, res) {
    const product = req.body;

    const newProduct = new ProductModel(product);
    await newProduct.save();

    res.redirect("back");
  }
  async updateProduct(req, res) {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductData
    );
    res.redirect("back");
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    const deleteProduct = await ProductModel.findByIdAndDelete(productId);
    res.redirect("back");
  }
}

module.exports = new ProductController();
