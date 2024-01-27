const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const mongooseSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const xss = require("xss-clean");
require("dotenv").config();
const { convertToApiError, handleError } = require("./middlewares/apiError");

const http = require("http");
const server = http.createServer(app);

//MongoDb Connection
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

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

//SANITIZE JSON
app.use(xss());

app.use(mongooseSanitize());

//ROUTES
app.use("/api", routes);

//API ERROR HANDLING
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
