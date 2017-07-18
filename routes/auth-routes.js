const express     = require('express');
const authRoutes  = express.Router();
const Customer    = require("../models/customer");
const Vendor      = require("../models/vendor");
const bcrypt      = require('bcrypt');
const bcryptSalt  = 10;


// --------------------------------------------------- Customer's SIGN UP
authRoutes.get("/signup", (req, res, next) => {
    res.render("auth/signup");
})
authRoutes.post("/signup", (req, res, next) => {
   //encrypt password 
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  //creates new customer 
  const newCustomer  = Customer({
    username,
    password: hashPass
  });
  //validate user & password insertion
  if (username === "" || password === "") {
    return res.render("auth/signup", {
        errorMessage : "Indicate a username and password to sign up"
    });
  }
  //validate if customer already exists
  Customer.findOne(
    { "username": username }, //search condition
    "username", //projection!
    (err, customer) => {
      if (customer !== null) {
        return res.render("auth/signup", {
          errorMessage: "The username already exists",
        }); 
      } else {
          newCustomer.save((err) => {
            return res.redirect("/search");
          })
      }
    })
 });

//----------------------------------------------------- Customer's LOGIN
authRoutes.get("/login", (req, res, next) => {
    res.render("auth/login");
})
authRoutes.post("/login", (req, res, next) => {
  //require customer's data for login
  const username = req.body.username;
  const password = req.body.password;
  //checks if customers fills up the login form
  if (username === "" || password === "") {
      return res.render("auth/login", {
        errorMessage: "Indicate a username and a password to sign up"
      });
  }
  //check if the customer username exists
  Customer.findOne({ "username": username }, (err, customer) => {
      if (err || !customer) {
       return res.render("auth/login", {
          errorMessage: "This username doesn't exist"
        })
      }
      if (bcrypt.compareSync(password, customer.password)) {
        // Save the login in the session!
        req.session.currentCustomer = customer;
        res.redirect("/search");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
        return;
      }
  });
});
//----------------------------------------------------- Customer's LOGOUT


// --------------------------------------------------- Vendor's SIGN UP
authRoutes.get("/vendorsignup", (req, res, next) => {
    res.render("auth/vendorsignup");
});
authRoutes.post("/vendorsignup", (req, res, next) => {
   //encrypt password 
  const email       = req.body.email;
  const password    = req.body.password;
  const name        = req.body.name;
  const postcode    = req.body.postcode;
  const cuisine     = req.body.cuisine;
  const capacity    = req.body.capacity;
  const salt        = bcrypt.genSaltSync(bcryptSalt);
  const hashPass    = bcrypt.hashSync(password, salt);
  //creates new vendor 
  const newVendor   = Vendor({
    email,
    password: hashPass,
    name,
    postcode,
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
            return res.redirect("/index");
          })
      }
    })
 });

//----------------------------------------------------- Vendor's LOGIN
authRoutes.get("/vendorlogin", (req, res, next) => {
    res.render("auth/vendorlogin");
});
//require vendor's data for login
authRoutes.post("/vendorlogin", (req, res, next) => {
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

module.exports = authRoutes;