const express = require("express");
const contentController = require("../controllers/content.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/content/create
router.post("/create", auth(), contentController.create);

//api/content/getAll
router.get("/getAll", auth(), contentController.getAllContent);

module.exports = router;
