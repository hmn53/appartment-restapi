//setting up admin router
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//db
const { admin, users } = require("../db");
const { SECRET } = require("../config/config");
const { joiValidate } = require("../utils/validation");
const { checkAdmin, checkToken } = require("../utils/middlewares");
const { getUserById } = require("../utils/helper");

let idCount = 2;
/* defining routes */

//POST admin login
router.post("/login", async (req, res) => {
  //Validation
  const error = joiValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if username exist
  const user = admin.username === req.body.username;
  if (!user) return res.status(400).send("Invalid Username");

  //Password check
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //JWT
  const jwt_token = jwt.sign(
    { type: "admin", username: req.body.username },
    SECRET.jwt
  );
  res.header("auth-token", jwt_token);
  res.cookie("token", jwt_token);
  res.status(200).send({ auth: true, jwt_token });
});

//POST admin logout
router.post("/logout", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).send("Not already Logged in");
  res.cookie("token", "");
  return res.status(200).send("Logged out");
});

//GET users and POST add users
router
  .route("/users")
  .get(checkToken, checkAdmin, (req, res) => {
    res.status(200).send({ users });
  })
  .post(checkToken, checkAdmin, (req, res) => {
    //Validation
    const error = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if username already exist
    const { username, password } = req.body;
    if (users.some((user) => user.username === username)) {
      return res.status(400).send("Username already exists");
    }

    //hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //create new user
    const user = { id: idCount++, username, password: hashedPassword };

    //add user to fake db
    users.push(user);

    return res.status(201).send(user);
  });

//GET user by id
router.get("/users/:id", checkToken, checkAdmin, (req, res) => {
  const { id } = req.params;
  //find user by given id
  const user = getUserById(id);
  //user not exist
  if (user.length === 0) return res.status(404).send("No user found");

  //user exists
  res.status(200).send({ user });
});

//PUT update user by id
router.put("/users/:id", checkToken, checkAdmin, (req, res) => {
  const { id } = req.params;
  //find user by given id
  const user = getUserById(id);
  //user not exist
  if (user.length === 0) return res.status(404).send("No user found");
  //user exists
  const { username, password } = req.body;
  //Validation
  const error = joiValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if username already exist
  if (users.some((user) => user.username === username)) {
    return res.status(400).send("Username already exists");
  }
  //hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  //update user
  const index = users.findIndex((user) => user.id == id);
  users[index].username = username;
  users[index].password = hashedPassword;

  return res.status(201).send({ user: users[index] });
});

//DELETE delete user by id
router.delete("/users/:id", checkToken, checkAdmin, (req, res) => {
  const { id } = req.params;
  //find user by given id
  const user = getUserById(id);
  //user not exist
  if (user.length === 0) return res.status(404).send("No user found");

  //delete user
  const index = users.findIndex((user) => user.id == id);
  const deletedUser = users.splice(index, 1);

  res.status(200).send({ user: deletedUser });
});

module.exports = router;
