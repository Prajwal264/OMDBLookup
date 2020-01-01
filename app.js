// import the required packages
// import express
var express = require("express");

// import request
var request = require("request");

// create an express variable
var app = express();

// dependencies
app.use(express.static("public"));

// set default view engine
app.set("view engine", "ejs");

// routes
// index route
app.get("/", function(req, res) {
  res.render("index");
});

// results route
app.get("/results", function(req, res) {
  var query = req.query.movie;
  var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("movies", { data: data, name: query });
    }
  });
});

// show route
app.get("/show/:id", function(req, res) {
  var url =
    "http://www.omdbapi.com/?i=" + req.params.id + "&plot=full&apikey=thewdb";
  request(url, function(err, response, body) {
    if (!err && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("show", { data: data });
    }
  });
});

// listener
app.listen(3000, process.env.IP, function() {
  console.log("Server has started!");
});
