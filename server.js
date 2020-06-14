const logger = require("morgan");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/news-scraper-supreme");
const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Connection error: Not connecting to Mongoose.")
);
db.once("open", () => console.log("Connected to Mongoose!"));

app.listen(PORT, () => console.log("App running on port " + PORT + "!"));
