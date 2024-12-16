const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    const user = req.user;
    const error = req.query.error;
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render("client/auth/login", {}, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
    res.render("layout/client-layout/layout", {
      title: "Login",
      body: bodyHtml,
      user,
      error,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req);
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    res.redirect("/auth/login?error=Invalid email or password");
  }
});

module.exports = router;
