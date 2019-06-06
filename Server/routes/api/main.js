var express = require("express");
const db = require("../db/connect");
var app = express();
var md5 = require("md5");

var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* GET users listing. */



//chia router api -> user
var userRouter = require("./user.js");
app.use("/user", userRouter);

//chia router api -> account
var accountRouter = require("./account");
app.use("/account",accountRouter);

//chia router api -> driver
var driverRouter = require("./driver");
app.use("/driver",driverRouter);

//chia touter api location
var locationRouter = require("./location");
app.use("/location",locationRouter);

//chia router api register
var registerRouter = require("./register");
app.use("/register",registerRouter);

//chia router api login
var loginRouter = require("./login");
app.use("/login",locationRouter);

module.exports = app;
