const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array().map((arr) => arr.msg) });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err)
      return res
        .status(400)
        .json({ err: "Saving user to DB failed", err: `${err}` });
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array().map((arr) => arr.msg) });
  }
  User.findOne({ email }, (err, user) => {
    if (err) res.status(404).json({ error: "This email does not exist" });
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password do not match" });
    }

    //Creating TOken
    const token = jwt.sign({ _id: user._id }, process.env.COOKIE);

    //saving token to cookie
    res.cookie("token", token, { expire: new Date() + 1000 });

    //Sending response to frontend
    const { _id, name, email, role } = user;
    res.json({
      token,
      user: {
        _id,
        name,
        role,
        email,
      },
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User Signed Out",
  });
};
