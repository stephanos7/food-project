const express = require('express');
const siteRoutes = express.Router();
const Vendor      = require("../models/vendor");
//INDEX PAGE
siteRoutes.get("/index", (req, res, next) => {
    res.render('index');
});

siteRoutes.get("/", (req, res, next) => {
    res.render('index');
});



siteRoutes.get("/search", (req, res, next) => {
   res.render('search');
});

siteRoutes.get("/search/:format", (req, res, next) => {
    Vendor.find((error, vendors) => {
    if (error) { next(error); }
    else {
        res.json(vendors)
    }
  })
});

siteRoutes.get("/dashboard", (req, res, next) => {
    res.render('dashboard');
});

//CUSTOMER PROTECTED SEARCH PAGE
siteRoutes.use((req, res, next) => {
    if (req.session.currentCustomer) {
        next();
    } else {
        res.redirect("/index");
    }
});


siteRoutes.use((req, res, next) => {
    if (req.session.currentVendor) {
        next();
    } else {
        res.redirect("/dashboard");
    }
});

module.exports = siteRoutes;