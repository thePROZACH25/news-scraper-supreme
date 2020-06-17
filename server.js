var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var routes = require("./controller/controller");
app.use(routes);

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });
var db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Connection error: Not connecting to Mongoose.")
);
db.once("open", () => console.log("You are connected to Mongoose!"));

app.listen(PORT, () => console.log(`Server listening on: http://localhost: ${PORT}!`));
