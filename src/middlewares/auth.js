const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdmin = token === "xyz";

  if (!isAdmin) {
    res.status(401).send("unautharised");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAdmin = token === "xyz";

  if (!isAdmin) {
    res.status(401).send("unautharised");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
