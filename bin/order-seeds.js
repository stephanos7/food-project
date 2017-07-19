const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/foodApp");
const Order  = require("../models/order");

const initialOrderData = [{
    orderName        : "Breakfast",
    orderQuantity    : 1,
    orderTotalPrice  : 9
},
{
    orderName        : "Brunch",
    orderQuantity    : 3,
    orderTotalPrice  : 11
},
{
    orderName        : "Lunch",
    orderQuantity    : 6,
    orderTotalPrice  : 14
},
{
    orderName        : "Supper",
    orderQuantity    : 9,
    orderTotalPrice  : 18
},
{
    orderName        : "Dinner",
    orderQuantity    : 12,
    orderTotalPrice  : 21
}];

Order.create(initialOrderData, (err, docs) => {
    if(err){
        throw err;
    }
    docs.forEach((element) => {
        console.log(element);
    })
    mongoose.connection.close();
})