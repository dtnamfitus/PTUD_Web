// routes/ui/adminAuth.ui.js
const express = require("express");
const router = express.Router();
const adminAuthController = require("../../../controllers/ui/adminAuth.controller");
const ensureAdminAuthenticated = require("../../../middleware/ensureAdminAuthenticate.middleware");

// GET /ui/admin/login - Render trang đăng nhập
router.get("/adminLogin", (req, res) => {
  res.render("admin/dashboard", { error: req.flash("error") });
});

// POST /ui/admin/login - Xử lý đăng nhập và chuyển hướng dashboard
router.post("/login", adminAuthController.adminLogin);

// GET /ui/admin/dashboard - Render dashboard admin
router.get("/dashboard", ensureAdminAuthenticated, adminAuthController.adminDashboard);

module.exports = router;
