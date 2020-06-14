var logger = require("morgan");
var mongoose = require("mongoose");

var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 3000;

// mongoose.connect("mongodb://localhost/unit18Populater", {
//   useNewUrlParser: true,
// });

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
