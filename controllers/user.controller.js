const UserService = require("./../services/user.service");
const passport = require("passport");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;
      return res.json({
        message: "Login successfully",
        user: userWithoutPassword,
      });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "Logout successfully" });
  });
};

module.exports = {
  login,
  logout,
};
