var express = require("express");
const db = require("../db/connect");
var app = express();
var moment = require('moment-timezone');

var bodyParser = require("body-parser");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* GET users listing. */
app.get("/location", function(req, res, next) {
  db.Local.find().exec(function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});

app.get("/location/:id", function(req, res, next) {
  db.Local.find().exec(function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});

app.post("/addLocation/:id", function(req, res, next) {
  //định dạng respone header theo content type là form và charset là utf8

  //lấy id của người add location
  var idUser = req.params.id;
  console.log(idUser);
  //lấy body của req để lấy data location
  var x = req.body.local_X;
  var y = req.body.local_Y;

  console.log(x + "," + y);

  db.Local.findOne({_id: '5cebac099ca9cb308c5ecb05'}, function(err,data){
    if(err) {
      console.log(err);
      res.status(500).send();
    } else {
      if(!data){
        res.status(400).send();
      } else {
        if(req.body.local_X) {
          data.local_X = req.body.local_X;
        }
        if(req.body.local_Y) {
          data.local_Y = req.body.local_Y;
        }

        data.dateAdded = Date();
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
