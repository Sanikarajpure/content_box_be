require("dotenv").config();
module.exports = {
  APP: {},
  APP_VALIDATIONS: {
    idValidation: { version: "uuidv4" },
    urlRegex:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    strongPasswordRegex:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    noWhiteSpaces: /^\S*$/,
  },
};
