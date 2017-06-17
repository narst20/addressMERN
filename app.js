var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var addressRoute = require('./routes/addressRoutes');

var app = express();

var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost/addressdb");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

app.use('/address', addressRoute);


app.listen(PORT, function(){
    console.log('Server Listening on port'+PORT);
})