const Product = require("../models/product");

exports.getProductById = (req, res, id, next) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) return res.status(400).json({ err: "Product not found" });
      req.product = product;
      next();
    });
};

exports.getAllProducts = (req, res) => {
  Product.find().exec((err, products) => {
    if (err || !products)
      return res.status(400).json({ err: "No Products Found" });
    res.json(products);
  });
};
