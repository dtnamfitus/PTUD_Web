const express = require("express");
const passport = require("../../../config/passport");
const router = express.Router();
const uiAuthController = require("../../../controllers/ui/auth.controller");

router.get("/login", uiAuthController.login);

router.get("/register", uiAuthController.register);

router.post(
  "/verify",
  passport.authenticate("local", {
    successRedirect: "/client/home",
    failureRedirect: "/client/auth/login",
    failureFlash: true,
    successFlash: false,
  })
);

router.post("/verifyRegister", uiAuthController.verifyRegister);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/client/auth/login");
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/client/home",
    failureRedirect: "/client/auth/login",
    failureFlash: true,
  })
);

module.exports = router;
