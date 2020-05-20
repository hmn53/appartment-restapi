//define middlewares
const jwt = require("jsonwebtoken");
const { appartments } = require("../db");
const { SECRET } = require("../config/config");

//jwt token check
checkToken = (req, res, next) => {
  // if (!req.cookies)
  //   return res.status(401).send("Authentication or Token required");
  const token = req.cookies.token;

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

//check if id is of current user
checkId = (req, res, next) => {
  const { user } = req;
  if (!user) return res.status(401).send("Authentication required");
  //user type
  const [appartment] = appartments.filter(
    (appartment) => appartment.userid == user.id
  );
  if (user.type == "admin") next();
  else if (appartments.some((appartment) => appartment.id == req.params.id))
    next();
  else return res.status(401).send("Not Authorised");
};

module.exports = {
  checkAdmin,
  checkToken,
  checkId,
};
