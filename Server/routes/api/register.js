var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//signup user (POST)
app.post("/user", async function (req, res, next) {
  // trả về status 500 : xảy ra lỗi hệ thống server : hiển thị người dùng vui lòng thử lại
  // trả về status 400 : xảy ra lỗi khi query csdl : hiển thị người dùng email đó đã được dùng
  // trả về status 200 : auto thành công -> xem body respone để hiển thị ra cho người dùng thông báo đăng ký thành công.

  if (
    req.body.Name == null || 
    req.body.Name == "" || 
    req.body.Email == null || 
    req.body.Email == "" || 
    req.body.Password == null || 
    req.body.Password == ""|| 
    req.body.PasswordConfim == null || 
    req.body.PasswordConfim == ""
    
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
      await db.Accounts.findOne({ UserName: Email }).exec(async function (
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
            Status:96, // 69 là lock,96 là unlock, 0 là chưa activate
            Role: 0  // 1 sẽ là ad, 2 sẽ là driver, khác sẽ là 0 (user)
          });

          //tim xem acc tao thanh cong de lay id,token,role
          await db.Accounts.findOne({ Name: Name, UserName: UserName }).exec(
            async function (err, result) {
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
                }).exec(function (err, data1) {
                  if (err)
                    return res.status(500).end("Đã xảy ra lỗi bất ngờ " + err);
                  else {
                    if (!data1) {
                      res.status(400).send("Xảy ra lỗi khi đăng ký");
                    } else {
                      console.log("sao k tra ve");
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
app.post("/driver", async function (req, res, next) {
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
    const Email = req.body.Email;
    const Birthday = req.body.Birthday;
    const IdentityCard = req.body.IdentityCard;
    const Address = req.body.Address;
    const NumberPhone = req.body.NumberPhone;
    const CarNumber = req.body.CarNumber;
    const CarInformation = req.body.CarInformation;
    const CarLicense = req.body.CarLicense;
    const CarSpecials = req.body.CarSpecials;
    

    try {
      //Check tài khoản có trong db chưa? 1: có, 0: bị lỗi bất ngờ.
      await db.Accounts.findOne({ UserName: Email }).exec(async function (
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
            Status: 0, // 69 là lock,96 là unlock, 0 là chưa activate
            Role: 2,  // 1 sẽ là ad, 2 sẽ là driver, khác sẽ là 0 (user)
          });
          //tim xem acc tao thanh cong de lay id,token,role
          await db.Accounts.findOne({ Name: Name, UserName: UserName }).exec(
            async function (err, result) {
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
                 
                });
                await db.InformationDrivers.findOne({
                  AccountID: trave.id,
                  Email: Email
                }).exec(function (err, data1) {
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

module.exports = app;
