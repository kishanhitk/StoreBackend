const Category = require("../models/category");
const category = require("../models/category");

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
