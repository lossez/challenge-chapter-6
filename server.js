const createError = require("http-errors");
const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { PORT = 3000 } = process.env;

const swaggerJSON = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());

const router = require("./routes/index");

app.use(router);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render("404", err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
