const Joi = require("joi");

const isValidationError = (error) => {
    return Joi.isError(error);
};

const tokenValidationSchema = Joi.object({
    token: Joi.string().required(),
});

const statusChangeValidationSchema = Joi.object({
    status: Joi.string().required().valid("accepted", "rejected", "unhandled"),
    token: Joi.string().required(),
    id: Joi.string().required(),
});

module.exports = {
    isValidationError,
    tokenValidationSchema,
    statusChangeValidationSchema,
};
