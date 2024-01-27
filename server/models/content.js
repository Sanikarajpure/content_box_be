const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
  title: {
    type: string,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  linkToContent: {
    type: string,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid content URL");
      }
    },
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = { Content };
