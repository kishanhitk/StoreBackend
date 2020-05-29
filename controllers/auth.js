const User = require("../models/user");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err)
      return res
        .status(400)
        .json({ err: "Saving user to DB failed", err: `${err}` });
    res.json({
      name:user.name,
      email:user.email,
      id:user._id
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User Signed Out",
  });
};
