var express = require('express');
var router = express.Router();
const db = require('../db/nosql');
// const checkUser = require('../query/checkUser');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt');
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/', function (req, res) {
    var Email = req.body.email;
    var Password =md5(req.body.password);
    

    db.User.findOne({ email: Email })
        .then(user => {
            if (user) {
                if (user.verify == 1) {
                    if(Password === user.password)
                    {
                        if(user.role ==="user")
                        {
                            const token = jwt.sign({email:Email,password:Password }, 'shhhhh');
                            const user = jwt.sign({role: user.role}, 'shhhhh');
                            return res.json({token,user});
                        }
                        else{
                            const token = jwt.sign({email:Email,password:Password,role:user.role }, 'shhhh');
                            return res.json({token});
                        }
                       
                    }
                    else
                    {
                        const err = "Mật khẩu không khớp"

                          return res.json({ err })
                    }
                    // bcrypt.compare(Password, user.password)
                    //     .then(compare => {
                    //         if (compare) {
                    //             const token = jwt.sign({email:Email,password:Password }, 'shhhhh');
                    //             return res.json({token});
                                
                    //         }
                    //         else {
                    //             const err = "Mật khẩu không khớp"

                    //             return res.json({ err })
                    //         }
                    //     })
                }
                else {
                    const err = "Tài khoản chưa được kích hoạt vui lòng vào mail đã đăng ký kích hoạt tài khoản để đăng nhập"

                    return res.json({ err })
                }

            }
            else {
                const err = "Tên đăng nhập không tồn tại"
                res.json({ err })
            }
        })
    // console.log(password);
    // const token = jwt.sign({email:email,password:password }, 'shhhhh');
    //     res.json({token});

    //   db.User.find({email: email}).countDocuments((err,num)=>{
    //     if(err) {
    //       return console.log(err);
    //   }
    //   if(num ==0)
    //   {
    //     db.User.create({userName:username,email:email,password:password});
    //     const token = jwt.sign({email:email,password:password }, 'shhhhh');
    //      res.json({token});
    //   }
    //   else{
    //     let errors = "Tài khoản đã tồn tại";


    //     res.json(errors);

    //   }

});

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


module.exports = router;
