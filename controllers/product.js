const Product = require("../models/product");
const formidale = require("formidable");
const _ = require("lodash");
const fs = require("fs");

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

exports.createProduct = (req, res) => {
  let form = new formidale.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) return res.status(400).json("Saving to DB failed");

    let product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 300000) {
        return res.status(400).json({ err: "File Size too big" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) return res.status(400).json({ err: "Saving to DB Failed" });
      res.json(product);
    });
  });
};
