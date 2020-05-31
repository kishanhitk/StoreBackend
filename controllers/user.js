const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (!user || err) {
      return res.status(400).json({
        err: "User not find",
      });
    }
    req.profile = user;

    next();
  });
};

exports.getUser = (req, res) => {
  //TODO:get here for password
  req.profile.salt = undefined;
  req.profile.createdAt = undefined;
  req.profile.encry_password = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindandModify: false },
    (err, user) => {
      if (err) {
        return res.json({
          err: "Updating User Failed",
        });
      }
      req.profile.salt = undefined;
      req.profile.createdAt = undefined;
      req.profile.encry_password = undefined;
      req.profile.updatedAt = undefined;
      res.json(req.profile);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .poulate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: "No orders found",
        });
      }
      res.json({
        order,
      });
    });
};
