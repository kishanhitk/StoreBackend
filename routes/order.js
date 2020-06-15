const express = require("express");
const router = express.Router();
const { getUserById, pushOrderinPurchaseList } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getOrderById } = require("../controllers/order");
const { updateStock, getProductById } = require("../controllers/product");

//param
router.param("userId", getUserById);
router.param("orderId", getOrderById);

module.exports = router;
