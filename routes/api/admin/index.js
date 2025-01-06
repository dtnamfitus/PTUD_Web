const adminAuthAPIRoute = require("./adminAuth.api");
const express = require("express");

const router = express.Router();
// Sử dụng các router
router.use("/api/admin/adminAuth", adminAuthAPIRoute);

module.exports = router;
