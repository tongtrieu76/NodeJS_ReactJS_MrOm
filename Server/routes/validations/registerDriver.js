var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');
const db = require("../db/connect");

module.exports = async function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.name)) {

    errors.username = 'Không được để trống';
  }

  if (Validator.isEmpty(data.username)) {
    errors.email = 'Không được để trống';
  }
  if (!Validator.isEmail(data.username)) {
    errors.email = 'Email không hợp lệ';
  }
  if (Validator.isEmail(data.username)) {



   await db.Accounts.findOne({ UserName: data.username }).then(user => {
      if (user) {
        if (user.UserName === data.username) {
        
          errors.email = 'Email đã tồn tại';
        }
      }

    }).catch(err=>{console.log(err)})


  }




  if (Validator.isEmpty(data.password)) {
    errors.password = 'Không được để trống';
  }
  if (Validator.isEmpty(data.passwordConfim)) {
    errors.passwordConfim = 'Không được để trống';
  }
  if (!Validator.equals(data.password, data.passwordConfim)) {
    errors.passwordConfim = 'Passwords không khớp';
  }




  return {
    errors,
    isValid: isEmpty(errors)
  }
}