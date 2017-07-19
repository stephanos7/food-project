const express       = require('express');
const vendorRoutes  = express.Router();
const Vendor        = require("../models/vendor");
const bcrypt        = require('bcrypt');
const bcryptSalt    = 10;

// --------------------------------------------------- Vendor's SIGN UP
vendorRoutes.get("/vendorsignup", (req, res, next) => {
    res.render("auth/vendorsignup");
});
vendorRoutes.post("/vendorsignup", (req, res, next) => {
   //encrypt password 
  const email       = req.body.email;
  const password    = req.body.password;
  const name        = req.body.name;
  const location    = {
      type : 'Point', 
      coordinates : [req.body.longitude, req.body.latitude]
    };
  const cuisine     = req.body.cuisine;
  const capacity    = req.body.capacity;
  const salt        = bcrypt.genSaltSync(bcryptSalt);
  const hashPass    = bcrypt.hashSync(password, salt);
  //creates new vendor 
  const newVendor   = Vendor({
    email,
    password: hashPass,
    name,
    location,
    cuisine,
    capacity
  });

  //validate email & password insertion
  if (email === "" || password === "") {
    return res.render("auth/vendorsignup", {
        errorMessage : "Indicate an email and password to sign up"
    });
  }
  //validate if vendor already exists
  Vendor.findOne(
    { "email": email }, //search condition
    "email", //projection!
    (err, vendor) => {
      if (vendor !== null) {
        return res.render("auth/vendorsignup", {
          errorMessage: "This email already exists",
        }); 
      } else {
          newVendor.save((err) => {
            console.log(vendor)
            res.render("search",{vendor});
          })
      }
    })
 });

//----------------------------------------------------- Vendor's LOGIN
vendorRoutes.get("/vendorlogin", (req, res, next) => {
    res.render("auth/vendorlogin");
});
//require vendor's data for login
vendorRoutes.post("/vendorlogin", (req, res, next) => {
  const email    = req.body.email;
  const password = req.body.password;
  //checks if vendors fills up the login form
  if (email === "" || password === "") {
      return res.render("auth/vendorlogin", {
        errorMessage: "Indicate a username and a password to sign up"
      });
  }
  //check if the vendor email exists
  Vendor.findOne({ "email": email }, (err, vendor) => {
      if (err || !vendor) {
       return res.render("auth/vendorlogin", {
          errorMessage: "This email doesn't exist"
        })
      }
      if (bcrypt.compareSync(password, vendor.password)) {
        // Save the login in the session!
        req.session.currentVendor = vendor;
        res.redirect("/dashboard");
          } else {
        res.render("auth/vendorlogin", {
          errorMessage: "Incorrect password"
        });
        return;
      } 
  });
});

module.exports = vendorRoutes;