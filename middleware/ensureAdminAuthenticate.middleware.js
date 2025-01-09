function ensureAdminAuthenticated(req, res, next) {
  console.log("auth:" , req.session.user)
  if (
    // req.isAuthenticated() &&
    // req.session.user?.isVerified === true &&
    req.session.user?.isAdmin === true
  ) {
    const user = req.session.user;
    // console.log("middleware: " , user)
    req.user = user
    return next();
  }
  req.flash("error", "You must be logged in");
  return res.redirect("/admin/login");
}

module.exports = ensureAdminAuthenticated;
