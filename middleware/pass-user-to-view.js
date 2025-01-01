const passUserToView = (req, res, next) => {
  console.log('User in session:', req.session.user);
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};

module.exports = passUserToView;