const express = require("express");
const router = express.Router();
const ensureAuthenticated = require("../../../middleware/ensureAuthenticate.middleware");
const uiCartController = require("../../../controllers/ui/cart.controller");

router.get("/", ensureAuthenticated, uiCartController.getCart);
router.post("/add", ensureAuthenticated, uiCartController.addToCart);
router.post("/remove", ensureAuthenticated, uiCartController.removeFromCart);
router.post("/update", ensureAuthenticated, uiCartController.updateCart);
router.post(
  "/update-quantity",
  ensureAuthenticated,
  uiCartController.updateProductQuantity
);

module.exports = router;
