// Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var geocode = require("geocoder");
var weather = require("weather-js");

//Require schema
var Address=require("./models/address")
var addressRoute = require('./routes/addressRoutes')
var htmlRoute = require('./routes/htmlRoutes')

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

app.use('/address', addressRoute);
app.use('/', htmlRoute);



// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
