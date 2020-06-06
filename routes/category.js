const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getCategoryById,
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} = require("../controllers/category");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "category/create/:usedID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/:categoryID", getCategory);
router.get("/categories", getAllCategories);

router.put(
  "category/:categoryId/:usedID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

module.exports = router;
