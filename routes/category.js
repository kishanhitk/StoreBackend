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
  removeCategory,
} = require("../controllers/category");

//Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Create Category
router.post(
  "category/create/:usedID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Actual Routes
router.get("/category/:categoryID", getCategory);
router.get("/categories", getAllCategories);

//UpdateCategory
router.put(
  "category/:categoryId/:usedID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete Category
router.delete(
  "category/:categoryId/:usedID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
