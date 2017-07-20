const express     = require('express');
const router      = express.Router();
const Vendor      = require("../models/vendor");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//GET ALL VENDORS
router.get('/allvendors', function(req, res, next) {

  Vendor.find((error, vendorList) => {
    if(error){
      return next(err);
    }
    console.log("getting vendors");
    res.render('allvendors', {vendorList});
  });
});

module.exports = router;