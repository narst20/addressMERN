var express = require('express');

var Address = require("../models/Address");

var router = express.Router();

router.post('/', function (req, res) {
   var address = new Address(req.body);

   address.save(function(err, data){
       if(err){
           console.log(err);
           res.send(err);
       }
       res.send(data);
   })
})

router.get('/',function(req,res){
    Address.find({}, function(err, data){
        if(err){
           console.log(err);
           res.send(err);
       }
       res.send(data);
    })
})

module.exports = router;