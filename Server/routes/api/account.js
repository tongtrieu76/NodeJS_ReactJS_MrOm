var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
// -- account
// -- -- account all
app.get("/", (req, res, next) => {
  try {
    db.Accounts.find().exec((err, result) => {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

// -- -- account key
app.get("/:key", (req, res, next) => {
  try {
    db.Accounts.find({
      $or: [
        { UserName: { $regex: req.params.key } },
        { Name: { $regex: req.params.key } }
      ]
    }).exec((err, result) => {
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
    db.Accounts.findOne({ _id: req.params.id }, function(err, result) {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

//account
// -- -- lock,unlock,active
app.post("/setstatus", function(req, res, next) {
  try {
    db.Accounts.findOne({ _id: req.body._id }, function(err, data) {
      if (err) res.status(500).send("Xay ra loi bat ngo");
      else {
        if (!data) {
          res.status(400).send("Khong tim thay bat ky tai khoan nao");
        } else {
          if (req.body.Status == "Hoạt động") {
            data.Status = 69;
            data.save(function(err, rs) {
              if (err) {
                console.log(err);
                res.status(500).send();
              } else {
                res.status(200).send("success");
              }
            });
          } else if (req.body.Status == "Khoá") {
            data.Status = 96;
            data.save(function(err, rs) {
              if (err) {
                console.log(err);
                res.status(500).send();
              } else {
                res.send(200, "success");
              }
            });
          } else if (req.body.Status == "Chưa kích hoạt") {
            data.Status = 96;
            data.save(function(err, rs) {
              if (err) {
                console.log(err);
                res.status(500).send();
              } else {
                res.status(200).send("success");
              }
            });
          } else {
            data.Status = 96;
            data.save(function(err, rs) {
              if (err) {
                console.log(err);
                res.status(500).send();
              } else {
                res.send(200, "success");
              }
            });
          }
        }
      }
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- -- doi mat khau.
app.post("/changepassword", function(req, res, next) {
  try {
    db.Accounts.findOne({ _id: req.body._id, Token: req.body.Token }, function(
      err,
      data
    ) {
      if (err) res.status(500).send("Xay ra loi bat ngo");
      else {
        if (!data) {
          res.status(400).send("Khong tim thay bat ky tai khoan nao");
        } else {
          if (req.body.Newpass != null) {
            var dem = 0;
            data.OldPassword.forEach(item => {
              if (item === req.body.Newpass) {
                dem++;
              }
            });
            if (data.Password === req.body.Newpass) {
              dem++;
            }
            if (dem === 0) {
              if (data.OldPassword.length >= 5) {
                data.OldPassword.shift();
              }
              data.OldPassword.push(data.Password);
              data.Password = req.body.Newpass;
              data.save((err, rs) => {
                if (err) {
                  console.log(err);
                  res.status(500).send();
                } else {
                  res.send(200, "success");
                }
              });
            } else {
              res
                .status(400)
                .send(
                  "Vui lòng đổi mật khẩu khác vì mật khẩu này đã được đổi gần đây"
                ); //Vui long doi mat khau khac vi mat khau nay da duoc doi gan day
            }
          } else {
            res.status(400).send("Du lieu khong hop le");
          }
        }
      }
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- -- delete acc
app.post("/deleteacc", function(req, res, next) {
  try {
    db.Accounts.findOne(
      { _id: req.body._id, Token: req.body.Token },
      async function(err, data) {
        if (err) res.status(500).send("Xay ra loi bat ngo");
        else {
          if (!data) {
            res.status(400).send("Khong tim thay bat ky tai khoan nao");
          } else {
            try {
              var flag = 0;
              db.InformationUsers.findOne({ AccountID: req.body._id }).exec(
                async function(err, rs) {
                  if (err) res.status(500).send("Xay ra loi bat ngo");
                  else {
                    if (!data) {
                      flag = 1;
                    } else {
                      await db.InformationUsers.deleteOne({
                        AccountID: req.body._id
                      });
                    }
                  }
                }
              );
              if (flag === 1) {
                await db.InformationDrivers.deleteOne({
                  AccountID: req.body._id
                });
              }
              await db.Accounts.deleteOne({ _id: req.body._id });
              res.status(200).send("success");
            } catch (err) {
              res.status(500).send("Xoa khong thanh cong");
            }
          }
        }
      }
    );
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

// account
// -- update theo UserName
app.post("/update", function(req, res, next) {
  try {
    db.Accounts.findOne({ UserName: req.body.UserName }, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!data) {
          res.status(400).send();
        } else {
          var arrOldPass = [];
          arrOldPass = data.OldPassword;
          if (req.body.Password) {
            arrOldPass.push(data.Password);
            data.Password = req.body.Password;
          }
          if (req.body.Name) {
            data.Name = req.body.Name;
          }
          if (req.body.Status) {
            data.Status = req.body.Status;
          }
          if (req.body.WhyLock) {
            data.WhyLock = req.body.WhyLock;
          }
          if (req.body.Token) {
            data.Token = req.body.Token;
          }
          if (req.body.StatusConnect) {
            data.StatusConnect = req.body.StatusConnect;
          }
          if (req.body.OldPassword) {
            while (arrOldPass.length > 5) {
              arrOldPass.shift();
            }
            data.OldPassword = arrOldPass;
          }
          if (req.body.Rate) {
            data.Rate = req.body.Rate;
          }
          data.save(function(err, rs) {
            if (err) {
              console.log(err);
              res.status(500).send();
            } else {
              res.status(200).send("success");
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ" + err);
  }
});

app.post("/updateInfor", (req, res, next) => {
  try {
    db.Accounts.findOne({ _id: req.body.id }, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!data) {
          res.status(400).send();
        } else {
          // change account
          try {
            var arrOldPass = [];
            arrOldPass = data.OldPassword;
            if (req.body.Password) {
              arrOldPass.push(data.Password);
              data.Password = req.body.Password;
            }
            if (req.body.Name) {
              data.Name = req.body.Name;
            }
            if (req.body.OldPassword) {
              while (arrOldPass.length > 5) {
                arrOldPass.shift();
              }
              data.OldPassword = arrOldPass;
            }
            data.save(function(err, rs) {
              if (err) {
                console.log(err);
                res.status(500).send();
              } else {
                res.status(200).send("success");
              }
            });
          } catch (err) {
            res.status(500).send("Đã xảy ra lỗi bất ngờ" + err);
          }

          // change infor
          if (req.body.Token == data.Token) {
            if (req.body.Role == 0) {
              try {
                db.Accounts.findOne({ _id: req.body.id }, (err, data) => {
                  if (err) {
                    res.status(500).send("Try again");
                  } else {
                    if (!data) {
                      res.status(400).send("Bad request");
                    } else {
                      if (data.Token == req.body.Token) {
                        db.InformationUsers.findOne(
                          { AccountID: req.body.id },
                          (error, rs) => {
                            if (error) {
                              res.status(500).send("Try again");
                            } else {
                              if (!rs) {
                                res.status(400).send("Bad request");
                              } else {
                                if (req.body.Birthday != null)
                                  data.Birthday = req.body.Birthday;
                                if (req.body.IdentityCard != null)
                                  data.IdentityCard = req.body.IdentityCard;
                                if (req.body.Address != null)
                                  data.Address = req.body.Address;
                                if (req.body.Email != null)
                                  data.Email = req.body.Email;
                                if (req.body.NumberPhone != null)
                                  data.NumberPhone = req.body.NumberPhone;
                                if (req.body.Point != null)
                                  data.Point = req.body.Point;

                                data.save((err, rs) => {
                                  if (err) res.status(500).send("Try again");
                                  else {
                                    res.status(200).send("success");
                                  }
                                });
                              }
                            }
                          }
                        ); //end db find
                      } else {
                        res.status(400).send("Bad request");
                      }
                    }
                  }
                });
              } catch (err) {
                res.status(500).send("Try again");
              }
            } else if (req.body.Role == 2) {
              try {
                db.Accounts.findOne({ _id: req.body.id }, (err, data) => {
                  if (err) {
                    res.status(500).send("Try again");
                  } else {
                    if (!data) {
                      res.status(400).send("Bad request");
                    } else {
                      if (data.Token == req.body.Token) {
                        db.InformationDrivers.findOne(
                          { AccountID: req.body.id },
                          (error, rs) => {
                            if (error) {
                              res.status(500).send("Try again");
                            } else {
                              if (!rs) {
                                res.status(400).send("Bad request");
                              } else {
                                if (req.body.Birthday != null)
                                  data.Birthday = req.body.Birthday;
                                if (req.body.IdentityCard != null)
                                  data.IdentityCard = req.body.IdentityCard;
                                if (req.body.Address != null)
                                  data.Address = req.body.Address;
                                if (req.body.Email != null)
                                  data.Email = req.body.Email;
                                if (req.body.NumberPhone != null)
                                  data.NumberPhone = req.body.NumberPhone;
                                if (req.body.CarNumber != null)
                                  data.CarNumber = req.body.CarNumber;
                                if (req.body.CarInformation != null)
                                  data.CarInformation = req.body.CarInformation;
                                if (req.body.CarLicense != null)
                                  data.CarLicense = req.body.CarLicense;
                                if (req.body.CarSpecials != null)
                                  data.CarSpecials = req.body.CarSpecials;
                                if (req.body.Rate != null)
                                  data.Rate = req.body.Rate;

                                data.save((err, rs) => {
                                  if (err) res.status(500).send("Try again");
                                  else {
                                    res.status(200).send("success");
                                  }
                                });
                              }
                            }
                          }
                        ); //end db find
                      } else {
                        res.status(400).send("Bad request");
                      }
                    }
                  }
                });
              } catch (err) {
                res.status(500).send("Try again");
              }
            } else if (req.body.Role == 0) {
              res.status(200).send("Không có quyền chỉnh sửa thông tin admin");
            } else {
              res.status(400).send("Truy cập bị từ chối.");
            }
          } else {
            res.status(400).send("Truy cập không được phép.");
          }
        }
      }
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ" + err);
  }
});

module.exports = app;
