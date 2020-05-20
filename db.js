//fake database

//user db
//password are stored as hash
const users = [
  {
    id: 1,
    username: "rahul",
    //password =  aada3wfKqE
    password: "$2a$10$DUjS1MzI4cfWdCTo4ToL/O/wMF0IF2GFa0OtlfxXQVeE6ztYblxMS",
  },
];

//admin db
const admin = {
  id: 1,
  username: "admin",
  password: "$2a$10$3uF.Yo68tntyFQaspgft1exuJaJBpF5GAM5T2BEoK1tzfSxy.UUTa",
};

//appartment db
const appartments = [
  {
    id: 1,
    userid: 1,
    number: 23,
    floor: 2,
    bedroom: "Large",
    owner: "Raj",
    tenant: "",
  },
];

module.exports = {
  admin,
  users,
  appartments,
};
