var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//GET
// -- location
// -- -- location all
app.get("/", function(req, res, next) {
  try {
    db.Locations.find().exec(function(err, result) {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- -- location theo id
app.get("/:id", function(req, res, next) {
  try {
    db.Locations.findOne({ AccountID: req.params.id }, function(err, result) {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

//
// method POST
// location
app.post("/", function(req, res, next) {
  try {
    db.Locations.findOne({ AccountID: "5cf0111d1c4b6c34fc277c1f" }, function(
      err,
      data
    ) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!data) {
          res.status(400).send();
        } else {
          if (req.body.Local_X) {
            data.Location_X = req.body.Location_X;
          }
          if (req.body.Local_Y) {
            data.Location_Y = req.body.Location_Y;
          }
          if (req.body.Status) {
            data.Status = req.body.Status;
          }
          // if (req.body.Date) {
          //   data.Date = req.body.Date;
          // }

          data.save(function(err, rs) {
            if (err) {
              console.log(err);
              res.status(500).send();
            } else {
              res.send(rs);
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

module.exports = app;
