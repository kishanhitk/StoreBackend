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

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err)
      return res.status(400).send({
        error: "Saving order to DB failed.",
      });
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name ")
    .exec((err, order) => {
      if (err)
        res.status(400).json({
          error: "Can not get all orders",
        });
      res.json(order);
    });
};

exports.updateStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
exports.getOrderStatus = (req, res) => {
  Order.update(
    {
      _id: req.body.orderId,
    },
    {
      $set: { status: req.body.status },
    },
    (err, order) => {
      if (err) return res.status(400), json({ error: "Updating order failed" });
      res.json(order);
    }
  );
};
