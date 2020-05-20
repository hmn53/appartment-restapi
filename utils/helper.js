const { users } = require("../db");
//helper functions

//get user by id
getUserById = (id) => {
  const user = users.filter((user) => user.id == id);
  return user;
};

module.exports = {
  getUserById,
};
