function ensureAdminAuthenticated(req, res, next) {
  if (
    req.isAuthenticated() &&
    req.user?.isVerified === true &&
    req.user?.isAdmin === true
  ) {
    return next();
  }
  req.flash("error", "You must be logged in");
  return res.redirect("/admin/auth/login");
}

module.exports = ensureAdminAuthenticated;
