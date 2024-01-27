const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongooseSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const xss = require("xss-clean");
require("dotenv").config();

const http = require("http");
const server = http.createServer(app);

// CORS
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.ORIGIN_FOR_CORS,
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "*",
      methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Authorization", "Content-Type"],
      credentials: true,
    })
  );
}

//BODY PARSER
app.use(express.json());

//COOKIE-PARSER
app.use(cookieParser());

//SANITIZE JSON
app.use(xss());

app.use(mongooseSanitize());
