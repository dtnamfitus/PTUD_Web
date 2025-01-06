const adminAuthUIRoute = require("./adminAuth.ui");
const express = require("express");

const router = express.Router();
// Sử dụng các router
router.use("/ui/admin/auth", adminAuthUIRoute);

module.exports = router;