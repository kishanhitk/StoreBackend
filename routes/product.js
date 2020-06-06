const express = require("express");
const router = express.Router();

const {
  getProductById,
  getAllProducts,
  createProduct,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("/productId", getProductById);
router.param("/userId", getUserById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/products", getAllProducts);

module.exports = router;
