const express = require('express');
const Vendor  = require('../models/vendor');
const Order   = require("../models/order");
const router  = express.Router();

const session        = require("express-session");
const customerData   = require('connect-mongo') (session);
const vendorData     = require('connect-mongo') (session);

//MIDDLEWARE TO ENSURE ALL FOLLOWING ROUTES ARE ACCESSIBLE ONLY BY SINGNED IN USERS
router.use((req, res, next) => {
  if (req.session.currentVendor) { next(); }
  else { res.redirect("/vendor-login");  }
});

//GET DASHBOARD 
router.get("/dashboard", (req, res, next) => {
    //get the signed-in user’s id from the Session
    const currentUser = req.session.currentVendor;

   //query mongo with that id to get the current vendor object
    Vendor.findById(currentUser._id, (err, theVendorFound) => {
    if(err) {
        console.log(err);
    }
    return theVendorFound;
    //GET ORDERS ON VENDOR DASHBOARD
    Order.find({ _orderedFrom : theVendorFound} , (err, theOrdersFound) => {
    if(err){
        console.log(err);
    }
    console.log(theOrdersFound);
    
    //pass the vendor object to the view to surface it’s values
    res.render("vendors/dashboard", {theVendorFound}, {theOrdersFound});
    })
    });
});

/*
//POST NEW DISH TO BE INCLUDED IN THE MENU
router.post("/vendors/vendor.id/new", (req, res, next) => { 
  let vendorId = req.params.id;
  console.log('vendor post: ', vendorId);
  res.redirect(`vendors/${vendor._id}`);
});
*/
module.exports = router;

