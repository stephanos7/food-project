const express = require('express');
const siteRoutes = express.Router();

//INDEX PAGE
siteRoutes.get("/index", (req, res, next) => {
    res.render('index');
});

siteRoutes.get("/", (req, res, next) => {
    res.render('index');
});





//CUSTOMER PROTECTED SEARCH PAGE
siteRoutes.use((req, res, next) => {
    if (req.session.currentCustomer) {
        next();
    } else {
        res.redirect("/index");
    }
});

siteRoutes.get("/search", (req, res, next) => {
    res.render('search');
});


// siteRoutes.use((req, res, next) => {
//     if (req.session.currentVendor) {
//         next();
//     } else {
//         res.redirect("/dashboard");
//     }
// });

// siteRoutes.get("/dashboard", (req, res, next) => {
//     res.render('dashboard');
// });



module.exports = siteRoutes;