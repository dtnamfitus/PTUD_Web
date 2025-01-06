// adminAuth.controller.js (một controller khác cho admin)
const passport = require("passport");

const adminLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      req.flash("error", "Something went wrong");
      return res.redirect("/admin/auth/login");
    }
    if (!user) {
      req.flash("error", info.message || "Invalid email or password");
      return res.redirect("/admin/auth/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        req.flash("error", "Login error");
        return res.redirect("/admin/auth/login");
      }

      if (!user.isAdmin) {
        req.flash("error", "You are not admin!");
        return res.redirect("/client/auth/login");
      }

      // Nếu đúng là admin => render layout admin
      return res.redirect("/admin/dashboard");
    });
  })(req, res, next);
};

const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isAdmin: false });
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({});

    res.render("admin/dashboard", {
      totalUsers,
      totalProducts,
      totalOrders,
      admin: req.user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading dashboard");
  }
};

module.exports = {
  adminLogin,
  adminDashboard,
};