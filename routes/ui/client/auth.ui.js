const express = require("express");
const passport = require("passport");
const router = express.Router();
const uiAuthController = require("../../../controllers/ui/auth.controller");

router.get("/login", uiAuthController.login);

router.post(
  "/verify",
  passport.authenticate("local", {
    successRedirect: "/client/auth/login",
    failureRedirect: "/client/auth/login?error=Invalid email or password",
  })
);

module.exports = router;
