const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/foodApp");
const Vendor  = require("../models/vendor");
const Dish = require("../models/vendor");
const Order = require("../models/order");

const initialOrderData = [{
    _orderedBy       : "597137e8912c400ef6df323a",
    _orderedFrom     : "5971386071a71d0f18d5faa3",
    _orderItems      : "ORDER 1: YES MIKE HAS ORDERED FROM YOU",
},
{
    _orderedBy       : "597137e8912c400ef6df323a",
    _orderedFrom     : "5971386071a71d0f18d5faa3",
    _orderItems      : "ORDER 2: YES MIKE HAS ORDERED FROM YOU",

},
{
    _orderedBy       : "596fcafe2e781d569ad397c9",
    _orderedFrom     : "597138198f86c60f02064119",
    _orderItems      : "ORDER 3: NO MIKE HAS NOT ORDERED FROM YOU",
},
{
    _orderedBy       : "596fa725ee8427524cd19dc9",
    _orderedFrom     : "597138198f86c60f0206411b",
    _orderItems      : "ORDER 4: NO MIKE HAS NOT ORDERED FROM YOU",
}
];


Order.create(initialOrderData, (err, docs) => {
    if(err){
        throw err;
    }
    docs.forEach((element) => {
        console.log(element);
    })
    mongoose.connection.close();
})