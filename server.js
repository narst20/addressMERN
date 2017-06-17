// Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var geocode = require("geocoder");
var weather = require("weather-js");

//Require schema
var Address=require("./models/address")

// Express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("./public"));


// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://127.0.0.1:27017/test");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent address data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // This GET request will search for the latest Address
  Address.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each address.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post("/api", function(req, res) {

  var addressID = req.body.addressID;
  var searchTerm = parseInt(req.body.searchTerm);
  var results = parseInt(req.body.results);

  // Note how this route utilizes the findOneAndUpdate function to update the clickCount
  // { upsert: true } is an optional object we can pass into the findOneAndUpdate method
  // If included, Mongoose will create a new document matching the description if one is not found
  Address.findOneAndUpdate({
    searchTerm: searchTerm
  }, {
    $set: {
      results: results
    }
  }, { upsert: true }).exec(function(err) {

    if (err) {
      console.log(err);
    }
    else {
      res.send("Successful search");
    }
  });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
