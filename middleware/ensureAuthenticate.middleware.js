function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user?.isVerified === true) {
    return next();
  }
  req.flash("error", "You must be logged in");
  return res.redirect("/client/auth/login");
}

module.exports = ensureAuthenticated;
