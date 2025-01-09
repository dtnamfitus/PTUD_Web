const express = require("express");

const router = express.Router();

const AdminAccountController = require("../../controllers/admin/account.controller");
const AdminProductController = require("../../controllers/admin/product.controller");
const AdminAuthController = require("../../controllers/admin/auth.controller");

const adminAuthMiddleware = require("../../middleware/ensureAdminAuthenticate.middleware")

router.get("/", (req, res) => {
  res.send("Admin Home");
});

// router.get("/reports", AbortController.abc);

// router.get("/profile", AbortController.abc);
router.get("/login", AdminAuthController.renderLogin);
router.post("/login", AdminAuthController.login);

router.get("/accounts", adminAuthMiddleware, AdminAccountController.getAccounts);
router.get("/accounts/:id", AdminAccountController.getAccountDetail);
router.get("/ban-account/:id", AdminAccountController.banAccount);

router.get("/categories", adminAuthMiddleware, AdminProductController.getAllCategories);
router.post("/categories", AdminProductController.addCategory);
router.post("/categories/update", AdminProductController.updateCategory);
router.get("/categories/:id/delete", AdminProductController.deleteCategory);
router.get("/manufacturers", adminAuthMiddleware, AdminProductController.getAllManufacturers);
router.post("/manufacturers/update", AdminProductController.updateManufacturer);
router.post("/manufacturers", AdminProductController.addManufacturer);
// router.put("/manufacturers/:id", AdminProductController.updateManufacturer);
router.get("/manufacturers/:id/delete", AdminProductController.deleteManufacturer);

router.get("/products", AdminProductController.getAllProducts);
router.post("/products", AdminProductController.addProduct);
router.get("/products/:id", AdminProductController.getProductById);
router.get("/products/:id/delete", AdminProductController.deleteProduct);
router.post("/products/:id/update", AdminProductController.updateProduct);

// router.get("/orders", AbortController.abc);
// router.get("/orders/:id", AbortController.abc);

module.exports = router;
