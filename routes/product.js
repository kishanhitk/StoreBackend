const express = require("express");
const router = express.Router();

const {
  getProductById,
  getAllProducts,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("productId", getProductById);
router.param("userId", getUserById);

//Create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//Read routes
router.get("/product", getAllProducts);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//Update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
//Delete Route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//listing Route
router.get("/products", getAllProducts);

module.exports = router;
