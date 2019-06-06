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
app.get("/location/:id", function(req, res, next) {
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
// -- user
// -- -- user all
app.get("/user", function(req, res, next) {
  try {
    db.InformationUsers.find().exec(function(err, result) {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- -- user theo id
app.get("/user/:id", function(req, res, next) {
  try {
    db.InformationUsers.findOne({ AccountID: req.params.id }, function(
      err,
      result
    ) {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

//
// -- driver
// -- -- driver all
app.get("/driver", (req, res, next) => {
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
app.get("/driver/:id", function(req, res, next) {
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

//
// -- account
// -- -- account all
app.get("/account", (req, res, next) => {
  try {
    db.Accounts.find().exec((err, result) => {
      if (err) return handleError(err);
      res.send(result);
    });
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- -- driver theo id
app.get("/account/:id", function(req, res, next) {
  try {
    db.Accounts.findOne({ AccountID: req.params.id }, function(err, result) {
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
app.post("/location", function(req, res, next) {
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

//account
// -- -- lock,unlock,active
app.post("/account/setstatus", function(req, res, next) {
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
app.post("/account/changepassword", function(req, res, next) {
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
app.post("/account/deleteacc", function(req, res, next) {
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
                      await db.InformationUsers.deleteOne({AccountID: req.body._id});
                    }
                  }
                }
              );
              if(flag === 1){
                await db.InformationDrivers.deleteOne({AccountID: req.body._id});
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

// user
app.post("/user", function(req, res, next) {
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
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});
// -- post add from page admin
app.post("/user/add", async function(req, res, next) {
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
        await db.InformationUsers.findOne(
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
                  Role: 0
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
                      res.status(400).send("Xảy ra lỗi khi đăng ký");
                    } else {
                      const _id = data._id;
                      await db.InformationUsers.create({
                        AccountID: _id,
                        Email: req.body.Email,
                        NumberPhone: req.body.NumberPhone,
                        Address: req.body.Address,
                        IdentityCard: req.body.IdentityCard,
                        Birthday: req.body.Birthday
                      });
                      await db.InformationUsers.findOne({
                        AccountID: _id
                      }).exec(async function(err, data) {
                        if (err)
                          return res
                            .status(500)
                            .end("Đã xảy ra lỗi bất ngờ " + err);
                        else {
                          if (!data) {
                            res.status(400).send("Xảy ra lỗi khi đăng ký");
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

//driver
// driver khong duoc edit thong tin ca nhan.
app.post("/driver", function(req, res, next) {
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

// account
// -- update theo UserName
app.post("/account/update", function(req, res, next) {
  try {
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
          // if (req.body.CreateDate) {
          //   data.CreateDate = req.body.CreateDate;
          // }
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

//LOGIN, SIGNUP , CHECKTOKEN
// -- login theo username
app.post("/login/username", function(req, res, next) {
  // db.Accounts.findOne({ UserName: req.body.UserName }, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send();
  //   } else {
  //     if (!data) {
  //       res.status(400).send();
  //     } else {
  //       if (data.Status == 96) {
  //         // 96 = status active
  //         var username = req.body.UserName;
  //         var password = req.body.Password;
  //         if (username == data.UserName && password == data.Password) {
  //           var token = {
  //             id: data.AccountID,
  //             token: data.Token,
  //             Role: data.Role
  //           };
  //           res.status(200).send(token);
  //         } else {
  //           res.status(400).send(false);
  //         }
  //         data.save(function(err, rs) {
  //           if (err) {
  //             console.log(err);
  //             res.status(500).send();
  //           } else {
  //             res.send(rs);
  //           }
  //         });
  //       } else if (data.Status == 69) {
  //         // 69 = status lock
  //         var trave = {
  //           UserName: data.UserName,
  //           Name: data.Name,
  //           WhyLock: data.WhyLock
  //         };
  //         res.send(400, trave);
  //       } else if (data.Status == 0) {
  //         //0 = status chưa active
  //         var trave = {
  //           UserName: data.UserName,
  //           Name: data.Name,
  //           CreateDate: data.CreateDate
  //         };
  //         res.send(200, trave);
  //       } else {
  //         res.send(400, "Bug!");
  //       }
  //     }
  //   }
  // });
});

// -- lgin theo email
app.post("/login", async function(req, res, next) {
  try {
    await db.InformationUsers.findOne({ Email: req.body.Email }, async function(
      err,
      data
    ) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!data) {
          await db.InformationDrivers.findOne(
            { Email: req.body.Email },
            function(err, data) {
              if (err) {
                console.log(err);
                res.status(500).send("Đã xảy ra lỗi bất ngờ");
              } else {
                if (!data) {
                  res.status(400).send("Sai email hoac mat khau");
                } else {
                  if (data.Status == 96) {
                    // 96 = status active
                    var email = req.body.Email;
                    var password = req.body.Password;
                    if (email == data.Email && password == data.Password) {
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
            }
          );
        } else {
          if (data.Status == 96) {
            // 96 = status active
            var email = req.body.Email;
            var password = req.body.Password;
            if (email == data.Email && password == data.Password) {
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
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ" + err);
  }
});

app.post("/checktoken", function(req, res, next) {
  try {
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
          if (
            id == data.AccountID &&
            token == data.Token &&
            role == data.Role
          ) {
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
  } catch (err) {
    res.status(500).send("Đã xảy ra lỗi bất ngờ" + err);
  }
});

//signup user (POST)
app.post("/registerUser", async function(req, res, next) {
  // trả về status 500 : xảy ra lỗi hệ thống server : hiển thị người dùng vui lòng thử lại
  // trả về status 400 : xảy ra lỗi khi query csdl : hiển thị người dùng email đó đã được dùng
  // trả về status 200 : auto thành công -> xem body respone để hiển thị ra cho người dùng thông báo đăng ký thành công.

  if (
    req.body.Name == null ||
    req.body.Name == "" ||
    req.body.Email == null ||
    req.body.Email == "" ||
    req.body.Password == null ||
    req.body.Password == ""
  ) {
    res.setHeader("Content-Type", "text/xml; charset=UTF-16LE");
    res.status(400).end("Không được phép truy cập!");
  } else {
    //Acc
    const Name = req.body.Name;
    // const UserName = req.body.UserName;
    const UserName = req.body.Email;
    const Password = req.body.Password;

    //Infor
    const Email = req.body.Email;
    const NumberPhone = req.body.NumberPhone;
    const Address = req.body.Address;
    const Birthday = req.body.Birthday;
    const IdentityCard = req.body.IdentityCard;
    let Token;

    try {
      //Check tài khoản có trong db chưa? 1: có, 0: bị lỗi bất ngờ.
      await db.Accounts.findOne({ Email: Email }).exec(async function(
        err,
        result
      ) {
        if (err) return res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
        else if (result != null) {
          //nếu có trả về 1
          res.status(400).send("TonTai");
        } else {
          //username đc tự tạo!! trường dư

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
            async function(err, result) {
              if (err) return res.end(0);
              else {
                const trave = {
                  id: result._id,
                  Token: result.Token,
                  Role: result.Role
                };
                await db.InformationUsers.create({
                  AccountID: trave.id,
                  Email: Email,
                  NumberPhone: NumberPhone,
                  Address: Address,
                  Birthday: Birthday,
                  IdentityCard: IdentityCard
                });
                await db.InformationUsers.findOne({
                  AccountID: trave.id,
                  Email: Email
                }).exec(function(err, data1) {
                  if (err)
                    return res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
                  else {
                    if (!data1) {
                      res.status(400).send("Xảy ra lỗi khi đăng ký");
                    } else {
                      res.end(JSON.stringify(trave));
                    }
                  }
                });
              }
            }
          );
        }
      });
    } catch (err) {
      console.log("ERROR" + err);
      res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
    }
  }
});

//signup driver(POST)
app.post("/registerDriver", async function(req, res, next) {
  //check req body
  if (req.body == null) {
  } else {
    // ACC
    const Name = req.body.Name;
    // const UserName = req.body.UserName;
    const UserName = req.body.Email;
    const Password = req.body.Password;
    let Token;

    // INFOR
    const Birthday = req.body.Birthday;
    const IdentityCard = req.body.IdentityCard;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const NumberPhone = req.body.NumberPhone;
    const CarNumber = req.body.CarNumber;
    const CarInformation = req.body.CarInformation;
    const CarLicense = req.body.CarLicense;
    const CarSpecials = req.body.CarSpecials;
    const DateSignup = Date.now;

    try {
      //Check tài khoản có trong db chưa? 1: có, 0: bị lỗi bất ngờ.
      await db.Accounts.findOne({ Email: Email }).exec(async function(
        err,
        result
      ) {
        if (err) return res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
        else if (result != null) {
          //nếu có trả về 1
          res.status(400).send("TonTai");
        } else {
          //username đc tự tạo!! trường dư

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
            Status: 0, //active
            Role: 0
          });
          //tim xem acc tao thanh cong de lay id,token,role
          await db.Accounts.findOne({ Name: Name, UserName: UserName }).exec(
            async function(err, result) {
              if (err) return res.end(0);
              else {
                const trave = {
                  id: result._id,
                  Token: result.Token,
                  Role: result.Role
                };
                await db.InformationDrivers.create({
                  AccountID: trave.id,
                  Email: Email,
                  NumberPhone: NumberPhone,
                  Address: Address,
                  Birthday: Birthday,
                  IdentityCard: IdentityCard,
                  CarNumber: CarNumber,
                  CarInformation: CarInformation,
                  CarLicense: CarLicense,
                  CarSpecials: CarSpecials,
                  DateSignup: DateSignup
                });
                await db.InformationDrivers.findOne({
                  AccountID: trave.id,
                  Email: Email
                }).exec(function(err, data1) {
                  if (err)
                    return res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
                  else {
                    if (!data1) {
                      res.status(400).send("Xảy ra lỗi khi đăng ký");
                    } else {
                      res.end(JSON.stringify(trave));
                    }
                  }
                });
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

module.exports = app;
