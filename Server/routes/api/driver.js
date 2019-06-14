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
    db.InformationDrivers.findOne({ AccountID: req.params.id }, function(
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
    db.InformationDrivers.findOne({ AccountID: req.body.AccountID }, function(
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

app.post("/add", async function(req, res, next) {
  await db.Accounts.findOne({ UserName: req.body.UserName }, async function(
    err,
    data
  ) {
    if (err) {
      res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
    } else {
      if (data) {
        res.status(400).send("UserName tồn tại");
      } else {
        await db.InformationDrivers.findOne(
          { Email: req.body.Email },
          async function(error, rs) {
            if (error) {
              res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
            } else {
              if (rs) {
                res.status(400).send("Email tồn tại");
              } else {
                if (req.body.Status === "unactive") {
                  req.body.Status = 69;
                } else if (req.body.Status === "active") {
                  req.body.Status = 96;
                } else {
                  //bla bla
                }
                const code =
                  req.body.Name +
                  req.body.UserName +
                  req.body.Password +
                  Math.floor(Math.random() * 10);
                const Token = md5(code);
                await db.Accounts.create({
                  Name: req.body.Name,
                  UserName: req.body.UserName,
                  Password: req.body.Password,
                  Status: req.body.Status,
                  Token: Token,
                  Role: 2
                });
                await db.Accounts.findOne({
                  Name: req.body.Name,
                  UserName: req.body.UserName,
                  Password: req.body.Password
                }).exec(async function(err, data) {
                  if (err)
                    return res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
                  else {
                    if (!data) {
                      res.status(400).send("Xảy ra lỗi khi đăng ký nodata acc");
                    } else {
                      const _id = data._id;
                      console.log(data._id);
                      await db.InformationDrivers.create({
                        AccountID: _id,
                        Email: req.body.Email,
                        NumberPhone: req.body.NumberPhone,
                        Address: req.body.Address,
                        IdentityCard: req.body.IdentityCard,
                        Birthday: req.body.Birthday,
                        CarNumber: req.body.CarNumber,
                        CarInformation: req.body.CarInformation,
                        CarLicense: req.body.CarLicense,
                        CarSpecials: req.body.CarSpecials,
                        DateSignup: req.body.CreateDate,
                        Rate: req.body.Rate
                      });
                      await db.InformationDrivers.findOne({
                        AccountID: _id
                      }).exec(async function(err, data) {
                        console.log(data);
                        if (err)
                          return res
                            .status(500)
                            .end("Đã xảy ra lỗi bất ngờ " + err);
                        else {
                          if (!data) {
                            res
                              .status(400)
                              .send("Xảy ra lỗi khi đăng ký nodata info");
                          } else {
                            res.status(200).send("success");
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          }
        );
      }
    }
  });
});

// Cập nhật thông tin
app.post("/updateInfor",(req,res,next) =>{
  try {
    db.Accounts.findOne({_id : req.body.id},(err,data) =>{
      if(err){
        res.status(500).send("Try again");
      } else {
        if(!data){
          res.status(400).send("Bad request");
        } else {
          if(data.Token == req.body.Token){
            db.InformationDrivers.findOne({AccountID: req.body.id},(error,rs) =>{
              if(error){
                res.status(500).send("Try again");
              } else {
                if(!rs){
                  res.status(400).send("Bad request");
                } else {
                  if(req.body.Birthday != null) data.Birthday = req.body.Birthday;
                  if(req.body.IdentityCard != null) data.IdentityCard = req.body.IdentityCard;
                  if(req.body.Address != null) data.Address = req.body.Address;
                  if(req.body.Email != null) data.Email = req.body.Email;
                  if(req.body.NumberPhone != null) data.NumberPhone = req.body.NumberPhone;
                  if(req.body.CarNumber != null) data.CarNumber = req.body.CarNumber;
                  if(req.body.CarInformation != null) data.CarInformation = req.body.CarInformation;
                  if(req.body.CarLicense != null) data.CarLicense = req.body.CarLicense;
                  if(req.body.CarSpecials != null) data.CarSpecials = req.body.CarSpecials;
                  if(req.body.Rate != null) data.Rate = req.body.Rate;

                  data.save((err,rs) =>{
                    if(err) res.status(500).send("Try again");
                    else {
                      res.status(200).send("success");
                    }
                  });
                }
              }
            });//end db find
          } else {
            res.status(400).send("Bad request");
          }
        }
      }
    })
  } catch(err){
    res.status(500).send("Try again");
  }
});



module.exports = app;
