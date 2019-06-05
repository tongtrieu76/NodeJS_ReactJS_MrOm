var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

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
  db.Locations.findOne({ AccountID: req.params.id }, function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});

//
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
  db.InformationUsers.findOne({ AccountID: req.params.id }, function(
    err,
    result
  ) {
    if (err) return handleError(err);
    res.send(result);
  });
});

//
// -- driver
// -- -- driver all
app.get("/driver", (req, res, next) => {
  db.InformationDrivers.find().exec((err, result) => {
    if (err) return handleError(err);
    res.send(result);
  });
});
// -- -- driver theo id
app.get("/driver/:id", function(req, res, next) {
  db.InformationUsers.findOne({ AccountID: req.params.id }, function(
    err,
    result
  ) {
    if (err) return handleError(err);
    res.send(result);
  });
});

//
// -- account
// -- -- account all
app.get("/account", (req, res, next) => {
  db.Accounts.find().exec((err, result) => {
    if (err) return handleError(err);
    res.send(result);
  });
});
// -- -- driver theo id
app.get("/Account/:id", function(req, res, next) {
  db.Accounts.findOne({ AccountID: req.params.id }, function(err, result) {
    if (err) return handleError(err);
    res.send(result);
  });
});

//
// method POST
// location
app.post("/location", function(req, res, next) {
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
});

// user
app.post("/user", function(req, res, next) {
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
        if (req.body.Point) {
          data.Point = req.body.Point;
        }
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
});
// -- -- lock,unlock,active
app.post("/user/setstatus", function(req, res, next) {
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
});
// -- -- doi mat khau.
app.post("/user/changepassword", function(req, res, next) {
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
          if(data.Password === req.body.Newpass){
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
});
// -- -- delete acc
app.post("/user/deleteacc", function(req, res, next) {
  db.Accounts.findOne(
    { _id: req.body._id, Token: req.body.Token },
    async function(err, data) {
      if (err) res.status(500).send("Xay ra loi bat ngo");
      else {
        if (!data) {
          res.status(400).send("Khong tim thay bat ky tai khoan nao");
        } else {
          try {
            await db.Accounts.deleteOne({ _id: req.body._id });
            res.status(200).send("success");
          } catch (err) {
            res.status(500).send("Xoa khong thanh cong");
          }
        }
      }
    }
  );
});

//driver
// driver khong duoc edit thong tin ca nhan.
app.post("/driver", function(req, res, next) {
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
});

// account
app.post("/account", function(req, res, next) {
  db.InformationUsers.findOne({ UserName: req.body.UserName }, function(
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
        var arrOldPass = [];
        arrOldPass = data.OldPassword;
        if (req.body.Password) {
          data.Password = req.body.Password;
          arrOldPass.push(req.body.Password);
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
          data.OldPassword = arrOldPass;
        }
        if (req.body.Rate) {
          data.Rate = req.body.Rate;
        }
        // if (req.body.CreateDate) {
        //   data.CreateDate = req.body.CreateDate;
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
});

app.post("/login", function(req, res, next) {
  db.Accounts.findOne({ UserName: req.body.UserName }, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!data) {
        res.status(400).send();
      } else {
        if (data.Status == 96) {
          // 96 = status active
          var username = req.body.UserName;
          var password = req.body.Password;
          if (username == data.UserName && password == data.Password) {
            var token = {
              id: data.AccountID,
              token: data.Token,
              Role: data.Role
            };
            res.status(200).send(token);
          } else {
            res.status(400).send(false);
          }
          data.save(function(err, rs) {
            if (err) {
              console.log(err);
              res.status(500).send();
            } else {
              res.send(rs);
            }
          });
        } else if (data.Status == 69) {
          // 69 = status lock
          var trave = {
            UserName: data.UserName,
            Name: data.Name,
            WhyLock: data.WhyLock
          };
          res.send(400, trave);
        } else if (data.Status == 0) {
          //0 = status chưa active
          var trave = {
            UserName: data.UserName,
            Name: data.Name,
            CreateDate: data.CreateDate
          };
          res.send(200, trave);
        } else {
          res.send(400, "Bug!");
        }
      }
    }
  });
});

app.post("/checktoken", function(req, res, next) {
  db.Accounts.findOne({ AccountID: req.body.AccountID }, function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      if (!data) {
        res.status(400).end();
      } else {
        var id = req.body.AccountID;
        var token = req.body.Token;
        var role = req.body.Role;
        if (id == data.AccountID && token == data.Token && role == data.Role) {
          if (data.Status == 96) {
            res.status(200).end(true);
          } else if (data.Status == 69) {
            res.status(400).end("Lock");
          } else if (data.Status == 0) {
            res.status(200).end("UnActive");
          } else {
            res.status(400).end("Bug!");
          }
        } else {
          res.status(400).end(false);
        }
      }
    }
  });
});

//signup user (POST)
app.post("/registerUser", async function(req, res, next) {
  if (
    req.body.Name == null ||
    req.body.Name == "" ||
    req.body.UserName == null ||
    req.body.UserName == "" ||
    req.body.Password == null ||
    req.body.Password == ""
  ) {
    res.setHeader("Content-Type", "text/xml; charset=UTF-16LE");
    res.status(400).end("Không được phép truy cập!");
  } else {
    const Name = req.body.Name;
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    let Token;

    try {
      //Check tài khoản có trong db chưa? 1: có, 0: bị lỗi bất ngờ.
      await db.Accounts.findOne({ UserName: UserName }).exec(async function(
        err,
        result
      ) {
        if (err) return res.end(0);
        else if (result != null) {
          //nếu có trả về 1
          res.status(200).send("TonTai");
        } else {
          //Tao Token cho account
          const code =
            Name + UserName + Password + Math.floor(Math.random() * 10);
          Token = md5(code);

          //tao document Account
          await db.Accounts.create({
            Name: Name,
            UserName: UserName,
            Password: Password,
            Token: Token,
            Status: 96, //active
            Role: 0
          });
          //tim xem acc tao thanh cong de lay id,token,role
          await db.Accounts.findOne({ Name: Name, UserName: UserName }).exec(
            function(err, result) {
              if (err) return res.end(0);
              else {
                const trave = {
                  id: result._id,
                  Token: result.Token,
                  Role: result.Role
                };
                res.end(JSON.stringify(trave));
              }
            }
          );
        }
      });
    } catch (err) {
      console.log("ERROR" + err);
      res.end("0");
    }
  }
});

//signup driver(POST)
app.post("/registerDriver", async function(req, res, next) {
  //check req body
  if (req.body == null) {
  } else {
    const Name = req.body.Name;
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const IdentityCard = req.body.IdentityCard;
    const NumberPhone = req.body.NumberPhone;
    const CarNumber = req.body.CarNumber;

    try {
      //xác minh tên user chưa tồn tại
      await db.Accounts.findOne({ UserName: UserName }).exec(async function(
        err,
        result
      ) {
        if (err) return res.end(0);
        else if (result != null) {
          //nếu có trả về 1
          res.status(200).send("TonTai");
        } else {
          //Tao Token cho account
          const code =
            Name + UserName + Password + Math.floor(Math.random() * 10);
          code = md5(code);

          //tao document Account
          await db.Accounts.create({
            Name: Name,
            UserName: UserName,
            Password: Password,
            Token: Token,
            Status: 0, //chưa active để có thể dùng tài khoản.
            Role: 2
          });

          //tim xem acc tao thanh cong de lay id,token,role
          await db.Accounts.findOne({ Name: Name, UserName: UserName }).exec(
            async function(err, result) {
              if (err) return res.end(0);
              else {
                var trave = {
                  id: result._id,
                  Token: result.Token,
                  Role: result.Role
                };
                await db.InformationDrivers.findOne({
                  AccountID: trave.id
                }).exec(function(err, result) {
                  if (err) return res.end(0);
                  else if (result != null) {
                    return res.end(0);
                  } else {
                    db.InformationDrivers.create(
                      {
                        AccountID: AccountID,
                        IdentityCard: IdentityCard,
                        NumberPhone: NumberPhone,
                        CarNumber: CarNumber
                      },
                      function(err, result) {
                        if (err) res.send(400, err);
                        else {
                          res.send(200, trave);
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        }
      });
    } catch (err) {}
  }
});

module.exports = app;
