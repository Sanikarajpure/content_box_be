const express = require("express");
const contentRoute = require("./content.route");
const authRoute = require("./auth.route");
const auth = require("../middlewares/auth");
const router = express.Router();

const routesIndex = [
  {
    path: "/content",
    route: contentRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
