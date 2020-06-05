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
