const Joi = require("@hapi/Joi");


const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(7).required(),
    email: Joi.string().min(7).required().email(),
  });

  const validation = schema.validate(data)

  return validation;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(7).required(),
    email: Joi.string().min(7).required().email(),
  });

  const validation = schema.validate(data)
  return validation;
};

module.exports = {
  registerValidation,
  loginValidation,
};
