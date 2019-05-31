var express = require("express");
const db = require("../db/connect");
var app = express();
var moment = require('moment-timezone');

var bodyParser = require("body-parser");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* GET users listing. */
//GET
// -- location
// -- -- location all
app.get("/location", function(req, res, next) {
  db.Locations.find().exec(function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});
// -- -- location theo id
app.get("/location/:id", function(req, res, next) {
  db.Locations.findOne({AccountID: req.params.id},function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});


// -- user
// -- -- user all
app.get("/user", function(req, res, next) {
  db.InformationUsers.find().exec(function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});
// -- -- user theo id
app.get("/user/:id", function(req, res, next) {
  db.InformationUsers.findOne({AccountID: req.params.id},function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});
// -- driver
// -- -- driver all
app.get("/driver",(req,res,next) => {
  db.InformationDrivers.find().exec((err,result) =>{
    if(err) return handleError(err);
    res.send(result);
  })
})
// -- -- driver theo id
app.get("/driver/:id", function(req, res, next) {
  db.InformationUsers.findOne({AccountID: req.params.id},function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});

// method POST
app.post("/addLocation/:id", function(req, res, next) {
  //định dạng respone header theo content type là form và charset là utf8

  //lấy id của người add location
  var idUser = req.params.id;
  console.log(idUser);
  //lấy body của req để lấy data location
  var x = req.body.Local_X;
  var y = req.body.Local_Y;

  console.log(x + "," + y);

  db.Locations.findOne({_id: '5cebac099ca9cb308c5ecb05'}, function(err,data){
    if(err) {
      console.log(err);
      res.status(500).send();
    } else {
      if(!data){
        res.status(400).send();
      } else {
        if(req.body.Local_X) {
          data.Location_X = req.body.Location_X;
        }
        if(req.body.Local_Y) {
          data.Location_Y = req.body.Location_Y;
        }

        data.Date = Date();
        // console.log(Date.parse(date_t));
        data.save(function(err, rs){
          if(err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(rs);
          }
        })
      }
    }
  });
});
module.exports = app;
