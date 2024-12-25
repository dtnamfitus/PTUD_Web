function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/client/auth/login?error=You must be logged in");
}

module.exports = ensureAuthenticated;
