require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const issueRouter = require("./routes/issueRouter");
// import router

const cors = require("cors");

// import error middle ware
const middlewareNotFound = require("./middleware/middlewareNotFound");
const middlewareErrHandler = require("./middleware/middlewareErrHandler");

// use cors to allow fetching from different domain
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// match api to particular router
app.use(`/${process.env.API_VERSION}/issue`, issueRouter);

// use middleware to deal with Error
app.use(middlewareErrHandler);
// use middleware to deal with Not found error
app.use(middlewareNotFound);

const port = process.env.PORT || 3000;

// start server
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
