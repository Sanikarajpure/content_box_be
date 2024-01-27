const { Content } = require("../models/content");
const httpStatus = require("http-status");
const userService = require("./user.service");
const { ApiError } = require("../middlewares/apiError");

const createContent = async (title, description, linkToContent, creator) => {
  try {
    //check for unique title
    if (await Content.titleTaken(title)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Title already exists");
    }

    const content = new Content({
      title,
      description,
      linkToContent,
      creator,
    });

    await content.save();
    return content;
  } catch (error) {
    throw error;
  }
};

const getContent = async (id) => {
  try {
    //check if user exists
    let user = await userService.findUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "This user does not exist");
    }

    //get all content in decending order of date i.e latest first for user

    const content = await Content.find({ creator: id }).sort({ createdAt: -1 });

    return content;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createContent,
  getContent,
};
