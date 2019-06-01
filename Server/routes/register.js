var express = require('express');
var router = express.Router();
const db = require('../db/nosql');
// const checkUser = require('../query/checkUser');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res) {
  var email = req.body.email;
  var password = md5(req.body.password);
  var username = req.body.username;
  db.User.findOne({ email: email }).then(result => {
    if (result) {
      let errors = "Tài khoản đã tồn tại";

      return res.json({errors});
    } else {
      db.User.create({userName:username,email:email,password:password});
      const token = jwt.sign({email:email,password:password }, 'shhhhh');
      return res.json({token});
    }
   // return result
  }).catch(err => {
    let errors = `Failed to find document: ${err}`;
    res.json({ errors });
  });

  // db.User.find({email: email}).countDocuments((err,num)=>{
  //   if(err) {
  //     return console.log(err);
  // }
  // if(num ==0)
  // {
  //   db.User.create({userName:username,email:email,password:password});
  //   const token = jwt.sign({email:email,password:password }, 'shhhhh');
  //    res.json({token});
  // }
  // else{
  //   let errors = "Tài khoản đã tồn tại";

  //  console.log("qwewqeqweqweqwe");
  //   res.json({errors});

  // }

  // });

  // db.User.update(
  //   {
  //   userName : "weeqw"
  // },
  // {
  //     email : "NewMartin123123"
  // }).exec() ;

  // if(user_name=='sadsad2@ww' && password=='sadsad2@ww'){
  //     res.send('success');
  // }
  // else{
  //   res.send('Failure');
  // }

})
module.exports = router;
