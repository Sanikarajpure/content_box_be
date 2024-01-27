const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const CONSTANTS = require("../constants/constants");

const UrlError = new Error("Please provide a valid URL to content");

const contentSchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().max(255).required(),
  linkToContent: Joi.string()
    .regex(CONSTANTS.APP_VALIDATIONS.urlRegex)
    .error(UrlError)
    .required(),
  creator: Joi.objectId().required(),
});

const getContentSchema = Joi.object({
  id: Joi.objectId().required(),
});

module.exports = {
  contentSchema,
  getContentSchema,
};
