const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/foodApp");
const Order  = require("../models/order");

const initialOrderData = [{
    vendorEmail      : "email",
    orderName        : "Breakfast",
    orderQuantity    : 1,
    orderTotalPrice  : 9
},
{
    vendorEmail      : "email",
    orderName        : "Brunch",
    orderQuantity    : 3,
    orderTotalPrice  : 11
},
{
    vendorEmail      : "email",
    orderName        : "Lunch",
    orderQuantity    : 6,
    orderTotalPrice  : 14
},
{
    vendorEmail      : "thewordlsbestchef@gmail.com",
    orderName        : "Supper",
    orderQuantity    : 9,
    orderTotalPrice  : 18
},
{
    vendorEmail      : "thewordlsbestchef@gmail.com",
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