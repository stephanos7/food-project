const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = require("./customer");
const orderSchema    = new Schema ({
    _orderedBy       : { type: Schema.Types.ObjectId, ref: 'Customer'},
    _orderedFrom     : { type: Schema.Types.ObjectId, ref: 'Vendor'},
    _orderItems      : [{ type: Schema.Types.ObjectId, ref: 'Dish'}],
}, {
    timeStamps : {
        createdAt : "created_at",
        updatedAt : "updated_at"
    
}
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;