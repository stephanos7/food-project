const express   = require('express');
const Customer  = require('../models/customer');
const Vendor    = require("../models/vendor");
const router    = express.Router();

// Bcrypt
const bcrypt             = require("bcrypt");
const bcryptSalt         = 10;


//MIDDLEWARE TO ENSURE ALL FOLLOWING ROUTES ARE ACCESSIBLE ONLY BY SINGNED IN USERS
router.use((req, res, next) => {
  if (req.session.currentCustomer) { next(); }
  else { res.redirect("/customer-login"); }
});


//GET SEARCH
router.get("/search", (req, res, next) => {
  res.render("customers/search",
    { username: req.session.currentCustomer.username }
  );
});

//FORMAT TO PASS VENDOR'S DATA INTO THE GOOGLE MAP
router.get("/search/:format", (req, res, next) => {
    Vendor.find((error, vendors) => {
    if (error) { next(error); }
    else {
        res.json(vendors)
    }
  })
});


//router.get("/dummy", (req, res, next) => {
  //const customerOrdering = req.session.currentCustomer;
    //console.log(customerOrdering);

    //res.render("customers/dummy", { customerOrdering });
  //});

module.exports = router;