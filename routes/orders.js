const express = require('express');
const Vendor  = require('../models/vendor');
const Order  = require('../models/order');

const router  = express.Router();

const session        = require("express-session");
const customerData   = require('connect-mongo') (session);
const vendorData     = require('connect-mongo') (session);

//MIDDLEWARE TO ENSURE ALL FOLLOWING ROUTES ARE ACCESSIBLE ONLY BY SINGNED IN USERS
router.use((req, res, next) => {
  if (req.session.currentCustomer) { next(); }
  else { res.redirect("/customer-login"); }
});


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
    res.redirect("/orders/order-confirmation");
    console.log("saved!");
  })
});

//render order confirmation page
router.get("/order-confirmation", (req, res, next) => {

  const custo = req.session.currentCustomer;
  console.log("this is the customer we get from sess: ", custo);

  Order.findOne({ _orderedBy : custo._id} , (err, theOrderFound) => {
      if(err){
        console.log(err);
      }
        console.log(theOrderFound);
    });


res.render("orders/order-confirmation", {theOrderFound});
});



module.exports = router;