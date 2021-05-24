const requireUser = (req, res, next) => {
  if (!req.user) {
    next({ message: "Must be logged in!" });
  }

  next();
};

module.exports = requireUser;
