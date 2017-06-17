var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddressSchema = new Schema({
    street: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    city: {
        type: String,
        required: true,
        minlength:1
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
   zip:{
       type: Number
   },
   searched:{
       type: Date,
       default:Date.now
   }
})

module.exports = mongoose.model("Address", AddressSchema);
