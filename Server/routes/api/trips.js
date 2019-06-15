var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//get all trips
app.get("/all", (req, res, next) => {
  try {
    db.Trips.find().exec((err, result) => {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});


module.exports = app;