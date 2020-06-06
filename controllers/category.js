const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exex((err, cate) => {
    if (err)
      res.status(400).json({
        err: "Category not found",
      });
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err)
      res.status(400).json({
        err: "Could not save category to DB",
      });
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err)
      res.status(400).json({
        err: "Categories not found",
      });
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) res.status(400).json({ err: "Cannot update category" });
    res.json({ updatedCategory });
  });
};
