const express     = require('express');
const indexRoutes = express.Router();
const Vendor      = require("../models/vendor");


//INDEX PAGE
indexRoutes.get("/index", (req, res, next) => {
    res.render('index');
});

indexRoutes.get("/", (req, res, next) => {
    res.render('index');
});


//SEARCH PAGE 
indexRoutes.get("/search", (req, res, next) => {
   res.render('search');
});

//FORMAT TO PAST VENDOR'S DATA INTO THE GOOGLE MAP
indexRoutes.get("/search/:format", (req, res, next) => {
    Vendor.find((error, vendors) => {
    if (error) { next(error); }
    else {
        res.json(vendors)
    }
  })
});

//DASHBOARD ROUTE
indexRoutes.get("/dashboard", (req, res, next) => {
    res.render('dashboard');
});

//CUSTOMER PROTECTED SEARCH PAGE
indexRoutes.use((req, res, next) => {
    if (req.session.currentCustomer) {
        next();
    } else {
        res.redirect("/index");
    }
});


indexRoutes.use((req, res, next) => {
    if (req.session.currentVendor) {
        next();
    } else {
        res.redirect("/dashboard");
    }
});


module.exports = indexRoutes;