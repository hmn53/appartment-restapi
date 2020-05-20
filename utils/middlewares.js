//define middlewares
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");

//jwt token check
checkToken = (req, res, next) => {
  const token = req.header("auth-token");

  //if token is not there
  if (!token) return res.status(401).send("Authentication or Token required");

  //verify token
  try {
    const verified = jwt.verify(token, SECRET.jwt);
    req.user = verified;
    next();
  } catch (e) {
    return res.status(400).send("Invalid Token " + e);
  }
};

//check if admin
checkAdmin = (req, res, next) => {
  const { user } = req;
  //user not there
  if (!user) return res.status(401).send("Authentication required");

  //user not admin
  if (user.type !== "admin")
    return res.status(403).send("Only Admin can Visit this page");

  //continue
  next();
};

module.exports = {
  checkAdmin,
  checkToken,
};
