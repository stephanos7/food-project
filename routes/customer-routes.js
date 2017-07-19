const express         = require('express');
const customerRoutes  = express.Router();
const Customer        = require("../models/customer");
const bcrypt          = require('bcrypt');
const bcryptSalt      = 10;

// --------------------------------------------------- Customer's SIGN UP
customerRoutes.get("/signup", (req, res, next) => {
    res.render("auth/signup");
})


customerRoutes.post("/signup", (req, res, next) => {
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
customerRoutes.get("/login", (req, res, next) => {
    res.render("auth/login");
})


customerRoutes.post("/login", (req, res, next) => {
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
       res.render("auth/login", {
          errorMessage: "This username doesn't exist"
        })
      }
      if (bcrypt.compareSync(password, customer.password)) {
        // Save the login in the session!
        req.session.currentCustomer = customer;
       return res.redirect("/search");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
        return res.redirect("/search");

      }
  });
});
//----------------------------------------------------- Customer's LOGOUT
module.exports = customerRoutes;