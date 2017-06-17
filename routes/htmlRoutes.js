var express = require('express');
var inquirer = require('')

var router = express.Router();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


module.exports = router;