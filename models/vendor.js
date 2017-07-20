const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Dish = require("./dish");

const vendorSchema = new Schema ({
    email    : String,
    password : String,
    name     : String,
    //location : { type : { type : String }, coordinates : [Number]  },
    cuisine  : String,
    capacity : Number,
    dish     : Dish.schema
 }, {
    timeStamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    }
});

//vendorSchema.index({ location: '2dsphere' });

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;