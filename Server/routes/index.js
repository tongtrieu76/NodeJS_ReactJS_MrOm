var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  // res.json([
  //   {
  //   "name" : "Baklava",
  //   "ingredients": ["Flower", "Baking soda", "Pistachios", "Honey", "Puff Pastry", "Love", "Wawa"],
  //   "image" : "http://assets.simplyrecipes.com/wp-content/forum/uploads/2008/02/baklava-horiz-a-640.jpg"
  //   },
  //   {
  //   "name" : "Chips N' Dip",
  //   "ingredients": ["Chips", "Dip"],
  //   "image" : "http://dinnerthendessert.com/wp-content/forum/uploads/2015/09/Chips-and-Guac-Small-680x453.jpg"
  //   }
  //   ]) ;
 
  
});


module.exports = router;
