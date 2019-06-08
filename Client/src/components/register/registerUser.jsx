import React from "react";
import validator from "validator";
import axios from "axios";
// import {  Redirect } from "react-router-dom";

import md5 from "md5";
import { login } from "../action/authActions";

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfim: "",
      NumberPhone: "",
      errors: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    let errors = {};
    event.preventDefault();
    if (validator.isEmpty(this.state.username) || validator.isEmpty(this.state.email) || validator.isEmpty(this.state.password) || validator.isEmpty(this.state.passwordConfim) || validator.isEmpty(this.state.NumberPhone)) {
      if (validator.isEmpty(this.state.username)) {
        errors.username = "Không được để trống";
      }
      if (validator.isEmpty(this.state.email)) {
        errors.email = "Không được để trống";
      }

      if (validator.isEmpty(this.state.password)) {
        errors.password = "Không được để trống";
      }
      if (validator.isEmpty(this.state.passwordConfim)) {
        errors.passwordConfim = "Không được để trống";
      }

      if (validator.isEmpty(this.state.NumberPhone)) {
        errors.NumberPhone = "Không được để trống";
      }

      this.setState({
        errors: errors
      });
    }

    if (!validator.isEmpty(this.state.username) && !validator.isEmpty(this.state.email) && !validator.isEmpty(this.state.password) && !validator.isEmpty(this.state.passwordConfim) && !validator.isEmpty(this.state.NumberPhone)) {
      if (!validator.equals(this.state.password, this.state.passwordConfim)) {
        errors.passwordConfim = "Passwords không khớp";
      }
      if (validator.equals(this.state.password, this.state.passwordConfim)) {
        const newUser = {
          Name: this.state.username,
          Email: this.state.email,
          Password: md5(this.state.password),
          PasswordConfim: md5(this.state.passwordConfim)
        };
        axios.post("/api/register/user", newUser)
          .then(res => {
            alert("Tạo Tài Khoản Thành Công");
            login(res.data)
      
          })
          .catch(err => {
              errors.email = "Email đã được đăng ký";
            
            this.setState({
              errors: errors
            });
          });

      }

      this.setState({
        errors: errors
      });
    }


  };
  classnames1 = () => {
    if (this.state.errors.username) {
      return "form-control is-invalid";
    }

    return "form-control ";
  };
  classnames2 = () => {


    if (this.state.errors.email) {
      return "form-control is-invalid";
    }
    return "form-control";
  };
  classnames3 = () => {
    if (this.state.errors.password) {
      return "form-control is-invalid";
    }

    return "form-control";
  };
  classnames4 = () => {
  
    if (this.state.errors.passwordConfim) {
      return "form-control is-invalid";
    }

    return "form-control";
  };

  classnames5 = () => {
 
    if (this.state.errors.NumberPhone) {
      return "form-control is-invalid";
    }

    return "form-control";
  };

  render() {
   

    return (
      <div className="Login2 mt-5 mb-5">
        <h1 className="text-white text-center"> Đăng Ký Người Dùng </h1>
        <form onSubmit={this.handleSubmit} method="POST">

          <div className="row">

            <div className="col-md-6">

              <div className="form-group text-light">
                <label htmlFor="email">Tài khoản:</label>
                <input
                  type="email"
                  className={this.classnames2()}
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="email@gmail.com"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{this.state.errors.email}</div>
              </div>
              <div className="form-group text-light">
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  type="password"
                  className={this.classnames3()}
                  id="password"
                  placeholder="Mật khẩu"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{this.state.errors.password}</div>
              </div>

              <div className="form-group text-light">
                <label htmlFor="password">Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  className={this.classnames4()}
                  id="passwordConfim"
                  placeholder="Mật khẩu"
                  value={this.state.passwordConfim}
                  onChange={this.handleChange}
                />

                <div className="invalid-feedback">
                  {this.state.errors.passwordConfim}
                </div>
              </div>



            </div>

            <div className="col-md-6">

              <div className="form-group text-light ">
                <label htmlFor="email">Họ Và Tên:</label>
                <input
                  type="text"
                  className={this.classnames1()}
                  id="username"
                  placeholder="Vd: Nguyễn Văn A"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{this.state.errors.username}</div>
              </div>


              <div className="form-group text-light ">
                <label htmlFor="NumberPhone">Số Điện Thoại:</label>
                <input
                  type="text"
                  className={this.classnames5()}
                  id="NumberPhone"
                  placeholder="0327247666"
                  value={this.state.NumberPhone}
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{this.state.errors.NumberPhone}</div>
              </div>




            </div>




          </div>






          <div className="text-center">
            <button type="submit" className="btn btn-default">
              Đăng Ký{" "}
            </button>
            {/* disabled={!this.validateForm()} */}
          </div>
        </form>
      </div>
    );
  }
}
