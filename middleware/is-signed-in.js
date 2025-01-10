const isSignedIn = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;