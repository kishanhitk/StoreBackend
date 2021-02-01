const Product = require("../models/product");
const formidale = require("formidable");
const _ = require("lodash");
const fs = require("fs");
// const { sortBy } = require("lodash");

exports.getProductById = (req, res, id, next) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) return res.status(400).json({ err: "Product not found" });
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidale.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) return res.status(400).json("Saving to DB failed");
    const { price, name, description, category, stock } = fields;
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({ err: "Please include all fields" });
    }
    let product = new Product(fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
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

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err)
      res.status(400).json({ error: `Failed to delete ${product.name}` });
    res.json({ message: `${product.name} deleted succesfully`, deletedProduct });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidale.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) return res.status(400).json("Saving to DB failed");

    let product = req.product;
    product = _.extend(product, fields);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ err: "File Size too big" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) return res.status(400).json({ err: "Updatation Failed" });
      res.json(product);
    });
  });
};

//Product Listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sort ? req.query.sort : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products)
        return res.status(400).json({ err: "No Products Found" });
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("Category", {}, (err, category) => {
    if (err)
      return res.status(400).json({
        error: "No category found",
      });
    res.json(category);
  });
};

exports.updateStock = (req, res) => {
  let myOperaration = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperaration, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        err: "Bulkwrite failed",
      });
    }
  });
};
