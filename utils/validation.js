const joi = require("@hapi/joi");

//JOI Validation
const joiValidate = (data) => {
  const schema = joi.object({
    username: joi.string().required().min(5),
    password: joi.string().required().min(6),
  });
  const { error } = schema.validate(data);
  return error;
};

const appartmentValidate = (data) => {
  const schema = joi.object({
    id: joi.number,
    number: joi.number.required(),
    floor: joi.number.required(),
    bedroom: joi.string.required(),
    owner: joi.string.required(),
    tenant: joi.string.required(),
  });
  const { error } = schema.validate(data);
  return error;
};
module.exports = { joiValidate };
