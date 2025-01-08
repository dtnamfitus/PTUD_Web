const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../../middleware/ensureAuthenticate.middleware");
const uiOrderController = require("../../controllers/order.controller");

router.post("/checkout", ensureAuthenticated, uiOrderController.checkout);
router.post("/place-order", ensureAuthenticated, uiOrderController.placeOrder);
router.get("/", ensureAuthenticated, uiOrderController.getAllOrder);
router.get("/:orderId", ensureAuthenticated, uiOrderController.getOrderDetail);

module.exports = router;
