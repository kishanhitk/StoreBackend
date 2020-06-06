const express = require("express");
const router = express.Router();

const { getProductById, getAllProducts } = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param("/productId", getProductById);
router.param("/userId", getUserById);

router.get("/products", getAllProducts);

module.exports = router;
