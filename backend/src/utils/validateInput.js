const joi = require("joi");
const createError = require("http-errors");

const validateUserInput = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).max(40).required(),
    instagram: joi.string().min(3).max(40).required(),
    email: joi
      .string()
      .min(6)
      .max(40)
      .required()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ["com", "net", "in", "co"],
        },
      }),
  });

  const { error } = schema.validate(data);
  if (error) throw createError(404, "Valid name & email is required");
};

const validateAdminInput = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).max(40).required(),
    email: joi
      .string()
      .min(6)
      .max(40)
      .required()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ["com", "net", "in", "co"],
        },
      }),
    is_admin: joi.number().required(),
  });

  const { error } = schema.validate(data);
  if (error) throw createError(404, "Valid name & email is required");
};

const validateQueryInput = (time) => {
  const schema = joi.object({
    timeQuery: joi.number().integer().min(10).max(99).required(),
  });

  const { error } = schema.validate({ timeQuery: time });
  if (error) throw createError(404, "Time Format is wrong");
};

module.exports = { validateUserInput, validateAdminInput, validateQueryInput };
