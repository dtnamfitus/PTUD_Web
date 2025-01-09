const productService = require("../../services/product.service");
const categoryService = require("../../services/product-category.service");
const manufacturerService = require("../../services/manufacturer.service");
const userService = require("../../services/user.service");

const bcrypt = require("bcrypt")

const renderLayout = require("../renderAdminLayout");

// render login page
const renderLogin = async (req, res) => {
  try {
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render("admin/login", {}, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
    await renderLayout(req, res, bodyHtml, "Login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering login page");
  }
};

const login = async (req, res) => {
  try {
    console.log("login")
    const { email, password } = req.body;
    const user = await userService.getUserFullInformation({ email, isAdmin: true });
    if (!user) {
      res.redirect("/admin/login")
      return
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.redirect("/admin/login")
      return
    }
    req.session.user = user
    req.user = user
    console.log(user)
    res.redirect("/admin/accounts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
};


module.exports = {
  renderLogin,
  login
};
