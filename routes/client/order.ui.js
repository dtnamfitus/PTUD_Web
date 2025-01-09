const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../../middleware/ensureAuthenticate.middleware");
const uiOrderController = require("../../controllers/order.controller");

router.post("/checkout", ensureAuthenticated, uiOrderController.checkout);
router.post("/place-order", ensureAuthenticated, uiOrderController.placeOrder);
router.get("/", ensureAuthenticated, uiOrderController.getAllOrder);
router.get(
  "/detail/:orderId",
  ensureAuthenticated,
  uiOrderController.getOrderDetail
);
router.post(
  "/create-checkout-session",
  uiOrderController.createCheckoutSession
);
router.get("/success", uiOrderController.handleSuccess);
router.get("/cancel", uiOrderController.cancel);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  uiOrderController.stripeWebhookHandler
);

module.exports = router;
