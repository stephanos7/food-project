const express = require('express');
const Vendor  = require('../models/vendor');
const Order  = require('../models/order');

const router  = express.Router();

const session        = require("express-session");
const customerData   = require('connect-mongo') (session);
const vendorData     = require('connect-mongo') (session);

router.post("/newOrder", (req, res, next) => {

  const loggedInUser = req.session.currentCustomer;

  // console.log("i am the user in your mind: ", loggedInUser._id);
  // console.log("I am the one who gives food :", req.body.chefId);
  // console.log("I am the food on your plate: ", req.body.orderedItem);

  const newOrder = new Order({
    _orderedBy    : loggedInUser._id,
    _orderedFrom  : req.body.chefId,
    _orderItems   : req.body.orderedItem
  });

newOrder.save((err) => {
  if(err){
    return next(err);
  }
  console.log("saved!");
})


  
});

module.exports = router;