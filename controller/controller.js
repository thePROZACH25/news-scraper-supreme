var express = require("express");
var router = express.Router();
// var path = require("path");

var axios = require("axios");
var cheerio = require("cheerio");

var Comment = require("../models/comments");
var Article = require("../models/articles");

// router.get("/", (req, res) => res.redirect("/articles"));

router.get("/", (req, res) => res.send("Welcome"));

router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.crunchyroll.com/news").then(function (response) {
      console.log(responce)
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    let $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function () {
      // Save an empty result object
      let result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      // Create a new Article using the `result` object built from scraping
      Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

module.exports = router;
