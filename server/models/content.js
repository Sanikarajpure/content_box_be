const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    linkToContent: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

contentSchema.statics.titleTaken = async function (title) {
  const content = await this.findOne({ title });

  return !!content;
};

const Content = mongoose.model("Content", contentSchema);

module.exports = { Content };
