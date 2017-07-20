const express = require('express');
const Vendor  = require('../models/vendor');
const Order  = require('../models/order');

const router  = express.Router();

const session        = require("express-session");
const customerData   = require('connect-mongo') (session);
const vendorData     = require('connect-mongo') (session);

router.post("/newOrder", (req, res, next) => {
  console.log("these are the params: ", req.body.chefId)

  
});

module.exports = router;