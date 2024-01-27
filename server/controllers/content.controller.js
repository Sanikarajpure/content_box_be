const { contentService } = require("../services/");
const {
  contentSchema,
  getContentSchema,
} = require("../validations/contentValidation");
const httpStatus = require("http-status");
require("dotenv").config();

const contentController = {
  async create(req, res, next) {
    try {
      //validating using joi
      let value = await contentSchema.validateAsync(req.body);

      if (value) {
        //create new content
        let content = await contentService.createContent(
          value.title,
          value.description,
          value.linkToContent,
          value.creator
        );

        res.status(httpStatus.CREATED).send({
          content,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async getAllContent(req, res, next) {
    try {
      //validating using joi
      let value = await getContentSchema.validateAsync(req.body);

      if (value) {
        //get all content
        let content = await contentService.getContent(value.id);

        res.status(httpStatus.FOUND).send({
          content,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
module.exports = contentController;
