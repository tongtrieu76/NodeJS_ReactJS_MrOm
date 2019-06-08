import React, { Component } from "react";
import axios from 'axios';
import validator from "validator";
import md5 from "md5";

import { Link } from "react-router-dom";
import { login } from "../action/authActions";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: "",
      password: "",
      errors: "",
    };
  }



  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let errors = {};

    if (validator.isEmpty(this.state.email) || validator.isEmpty(this.state.password)) {
      if (validator.isEmpty(this.state.email)) {
        errors.email = "Không được để trống";
      }

      if (validator.isEmpty(this.state.password)) {
        errors.password = "Không được để trống";
      }

      this.setState({
        errors: errors
      });
    }
    if (!validator.isEmpty(this.state.email) && !validator.isEmpty(this.state.password)) {

      const newUser = {

        Email: this.state.email,
        Password: md5(this.state.password),

      }

      axios.post('/api/login/', newUser)

        .then(res => {
          login(res.data)
        })

        .catch(err => {
          console.log(err.response)
          errors.errors = "Email hoặc mật khẩu không đúng";
            
            this.setState({
              errors: errors
            });
        })

    }

  }
  classnames1 = () => {


    if (this.state.errors.email) {
      return "form-control is-invalid";
    }
    return "form-control";
  };
  classnames2 = () => {
    if (this.state.errors.password) {
      return "form-control is-invalid";
    }

    return "form-control";
  };



  render() {
    console.log(this.state)

    return (

      <div className="Login mt-5 mb-5">
        <h1 className="text-white text-center"> Đăng Nhập </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group text-light">
            <label htmlFor="email">Tài Khoản:</label>
            <input type="email" className={this.classnames1()} id="email" aria-describedby="emailHelp" placeholder="Nhập email" value={this.state.email}
              onChange={this.handleChange} />

            <div className="invalid-feedback">{this.state.errors.email}</div>

          </div>

          <div className="form-group text-light">
            <label htmlFor="password">Mật Khẩu:</label>
            <input type="password" className={this.classnames2()} id="password" placeholder="Mật khẩu" value={this.state.password}
              onChange={this.handleChange} />

            <div className="invalid-feedback">{this.state.errors.password}</div>

          </div>


          <div className="text-center invalid-feedback1 mt-3 mb-3">{this.state.errors.errors}</div>

          <div className="text-center">
            <button type="submit" className="btn btn-default" >Đăng Nhập</button>
          </div>

          <div className="text-center text-light mt-4">
            Bạn chưa có tài khoản, hãy
            &nbsp;
              <Link
              className="text-light font-weight-bold" to='/register/user'>
              Đăng Ký !
              </Link> </div>

        </form>
        {/* <Route exact path='/login/*' component={Error404} /> */}

        {/* <Redirect to="/404" /> */}
      </div>



    );
  }
}