var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
// -- driver
// -- -- driver all
app.get("/", (req, res, next) => {
  try {
    db.InformationDrivers.find().exec((err, result) => {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- -- driver theo id
app.get("/:id", function(req, res, next) {
  try {
    db.InformationUsers.findOne({ AccountID: req.params.id }, function(
      err,
      result
    ) {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xãy ra lỗi bất ngờ " + err);
  }
});

//driver
// driver khong duoc edit thong tin ca nhan.
app.post("/", function(req, res, next) {
  try {
    db.InformationUsers.findOne({ AccountID: req.body.AccountID }, function(
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
          if (req.body.Birthday) {
            data.Birthday = req.body.Birthday;
          }
          if (req.body.IdentityCard) {
            data.IdentityCard = req.body.IdentityCard;
          }
          if (req.body.Address) {
            data.Address = req.body.Address;
          }
          if (req.body.Email) {
            data.Email = req.body.Email;
          }
          if (req.body.NumberPhone) {
            data.NumberPhone = req.body.NumberPhone;
          }
          if (req.body.CarNumber) {
            data.CarNumber = req.body.CarNumber;
          }
          if (req.body.CarInformation) {
            data.CarInformation = req.body.CarInformation;
          }
          if (req.body.CarLicense) {
            data.CarLicense = req.body.CarLicense;
          }
          if (req.body.CarSpecials) {
            data.CarSpecials = req.body.CarSpecials;
          }
          // if (req.body.DateSignup) {
          //   data.DateSignup = req.body.DateSignup;
          // }
          if (req.body.Rate) {
            data.Rate = req.body.Rate;
          }
          // console.log(Date.parse(date_t));
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
    res.status(500).send("Đã xảy ra lỗi bất ngờ" + err);
  }
});

module.exports = app;
