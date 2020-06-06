const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getCategoryById, createCategory } = require("../controllers/category");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "category/create/:usedID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

module.exports = router;
