var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// Customer servisinin sağlıklı çalışıp çalışmadığını test etmek için endpoint
app.get("/customer", (req, res) => {
  res.send("🚀 Customer service is running on port 8001");
});

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// PORT'u belirleyerek dinleme başlat
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Customer service is running on port ${PORT}`);
});

module.exports = app;
