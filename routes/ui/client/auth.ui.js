const express = require("express");
const passport = require("./../../../config/passport");
const router = express.Router();
const uiAuthController = require("../../../controllers/ui/auth.controller");

router.get("/login", uiAuthController.login);

router.post(
  "/verify",
  passport.authenticate("local", {
    successRedirect: "/client/home",
    failureRedirect: "/client/auth/login",
    failureFlash: true,
    successFlash: false,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/client/auth/login");
  });
});

module.exports = router;
