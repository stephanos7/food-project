const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema ({
    username : String,
    password : String,
    postcode : String, 
    capacity : Number,
    cuisine : String,
    name : String
}, {
    timeStamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;