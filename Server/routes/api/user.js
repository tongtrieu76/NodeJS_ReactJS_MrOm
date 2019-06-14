var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//
// -- user
// -- -- user all
app.get("/", function(req, res, next) {
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
    res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
  }
});

// user
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

//Cập nhật thông tin

//cập nhật thông tin
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
            db.InformationUsers.findOne({AccountID: req.body.id},(error,rs) =>{
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
                  if(req.body.Point != null) data.Point = req.body.Point;

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





// //user
// app.post("/", function(req, res, next) {
//   try {
//     db.InformationUsers.findOne({ AccountID: req.body.AccountID }, function(
//       err,
//       data
//     ) {
//       if (err) {
//         console.log(err);
//         res.status(500).send();
//       } else {
//         if (!data) {
//           res.status(400).send();
//         } else {
//           if (req.body.Birthday) {
//             data.Birthday = req.body.Birthday;
//           }
//           if (req.body.IdentityCard) {
//             data.IdentityCard = req.body.IdentityCard;
//           }
//           if (req.body.Address) {
//             data.Address = req.body.Address;
//           }
//           if (req.body.Email) {
//             data.Email = req.body.Email;
//           }
//           if (req.body.NumberPhone) {
//             data.NumberPhone = req.body.NumberPhone;
//           }
//           if (req.body.Point) {
//             data.Point = req.body.Point;
//           }
//           data.save(function(err, rs) {
//             if (err) {
//               console.log(err);
//               res.status(500).send();
//             } else {
//               res.send(rs);
//             }
//           });
//         }
//       }
//     });
//   } catch (err) {
//     res.status(500).send("Đã xảy ra lỗi bất ngờ " + err);
//   }
// });


module.exports = app;
