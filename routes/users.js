//setting up user router
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../db");
const { SECRET } = require("../config/config");
const { joiValidate } = require("../utils/validation");

/* Routes */

//POST user login
router.post("/login", async (req, res) => {
  //Validation
  const error = joiValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if username exist
  const user = users.filter((user) => user.username === req.body.username);
  if (user.length === 0) return res.status(400).send("Invalid Username");

  //Password check
  const validPass = await bcrypt.compare(req.body.password, user[0].password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //JWT
  const jwt_token = jwt.sign(
    { type: "user", id: user[0].id, username: req.body.username },
    SECRET.jwt
  );
  res.header("auth-token", jwt_token);
  res.cookie("token", jwt_token);
  res.status(200).send({ auth: true, jwt_token });
});

//POST user logout
router.post("/logout", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).send("Not already Logged in");
  res.cookie("token", "");
  return res.status(200).send("Logged out");
});

module.exports = router;
