var express = require("express");
var router = express.Router();
const { signout, signup, signin } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.get("/signout", signout);
router.post(
  "/signup",
  [
    check("email", "This is not a valid email").isEmail(),
    check("name", "Please enter a valid name").isLength({ min: 3 }),
    check("password", "Password must be at least 6 digits long").isLength({
      min: 6,
    }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "This is not a valid email").isEmail(),
    check("password", "password is required").isLength({
      min: 6,
    }),
  ],
  signin
);
module.exports = router;
