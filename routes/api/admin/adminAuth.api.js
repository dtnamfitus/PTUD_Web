// routes/api/adminAuth.api.js
const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/user.controller.js");

// POST /api/admin/auth/login - API đăng nhập
router.post("/login", userController.login);

// GET /api/admin/auth/logout - API đăng xuất
router.get("/logout", userController.logout);

module.exports = router;
