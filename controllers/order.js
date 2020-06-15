const { ProductCart, Order } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err)
        res.status(400).json({
          error: "No order in DB",
        });
      req.order = order;
      next();
    });
};
