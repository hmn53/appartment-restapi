//setting up appartment router
const router = require("express").Router();
const { appartments, users, admin } = require("../db");
const { checkToken, checkId } = require("../utils/middlewares");
const { appartmentValidate } = require("../utils/validation");

//middleware
router.use(checkToken);

let idCount = 2;

// GET and POST routes
router
  .route("/")
  .post((req, res) => {
    const { user } = req;
    //Validation
    const error = appartmentValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //check user type
    const { userid, floor, bedroom, number, owner, tenant } = req.body;
    const appartment = {
      id: idCount++,
      userid,
      number,
      floor,
      bedroom,
      owner,
      tenant,
    };
    if (user.type === "admin") {
      appartment["userid"] = userid;
    } else {
      appartment["userid"] = user.id;
    }
    appartments.push(appartment);
    return res.status(201).send(appartment);
  })
  .get((req, res) => {
    const { user } = req;
    //check user type
    if (user.type === "admin") {
      return res.status(200).send(appartments);
    } else {
      const userAppartments = appartments.filter(
        (appartment) => appartment.userid == user.id
      );
      return res.status(200).send(userAppartments);
    }
  });

//GET PUT DELETE a single appartment routes
router
  .route("/:id")
  .get(checkId, (req, res) => {
    const { user } = req;
    const userAppartment = appartments.filter(
      (appartment) => appartment.id == req.params.id
    );
    if (userAppartment.length === 0) return res.status(404).send("Not found");
    return res.status(200).send(userAppartment);
  })
  .put(checkId, (req, res) => {
    const { user } = req;
    //Validation
    const error = appartmentValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const [appartment] = appartments.filter(
      (appartment) => appartment.id == req.params.id
    );
    const { userid, floor, bedroom, number, owner, tenant } = req.body;
    const index = appartments.findIndex(
      (appartment) => appartment.id == req.params.id
    );
    appartments[index].number = number;
    appartments[index].floor = floor;
    appartments[index].bedroom = bedroom;
    appartments[index].owner = owner;
    appartments[index].tenant = tenant;
    //check user type

    if (user.type === "admin") {
      appartments[index].userid = userid;
    }
    return res.status(201).send(appartments[index]);
  })
  .delete(checkId, (req, res) => {
    const index = appartments.findIndex(
      (appartment) => appartment.id == req.params.id
    );
    const deleted = appartments.splice(index, 1);
    return res.status(200).send(deleted);
  });

module.exports = router;
