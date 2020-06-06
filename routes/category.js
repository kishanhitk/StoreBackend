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
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//Actual Routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//UpdateCategory
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete Category
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
module.exports = router;
