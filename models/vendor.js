const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema ({
    email    : String,
    password : String,
    name     : String,
    postcode : String, 
    location : { type : { type : String }, coordinates : [Number]  },
    cuisine  : String,
    capacity : Number
   
}, {
    timeStamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;