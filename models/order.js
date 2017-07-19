const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = require("./customer");

const orderSchema    = new Schema ({
    orderName        : String,
    orderQuantity    : Number,
    orderTotalPrice  : Number,   
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;