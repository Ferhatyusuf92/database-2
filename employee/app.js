const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
const PORT = process.env.PORT || 8002; // *PORT sabitlendi*

// Employee servisinin test endpointi
app.get("/employee", (req, res) => {
  res.send("Employee service is running on port 8002");
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
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(` Employee service is running on port ${PORT}`);
});

module.exports = app;
