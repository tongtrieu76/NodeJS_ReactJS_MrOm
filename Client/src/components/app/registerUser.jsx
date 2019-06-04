import React from "react";
import validator from 'validator';
import axios from 'axios';
import { BrowserRouter as Redirect } from "react-router-dom";
import Autho from './setAutho';
import md5 from 'md5';


export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfim: "",
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

    const newUser = {
      Name: this.state.username,
      UserName: this.state.email,
      Password: md5(this.state.password),
      PasswordConfim: md5(this.state.passwordConfim),
    }



    axios.post('/api/registerUser', newUser)
      .then(res => {
        console.log(res.data)
       

         localStorage.setItem('jwtToken', res.data.Token);
         localStorage.setItem('jwtid', res.data.id);
         localStorage.setItem('jwtRole', res.data.Role);
          Autho(res.data.Token);
        // alert("Tạo Tài Khoản Thành Công");
        //  this.props.history.push("/");
       
        // window.location.reload();
      }).catch(err => {
        if (err.response.status === 400) {
          console.log("Lỗi 400");


          if (validator.isEmpty(this.state.username)) {

            errors.username = 'Không được để trống';
          }
          if (validator.isEmpty(this.state.email)) {

            errors.email = 'Không được để trống';
          }


          if (validator.isEmpty(this.state.password)) {

            errors.password = 'Không được để trống';
          }
          if (validator.isEmpty(this.state.passwordConfim)) {

            errors.passwordConfim = 'Không được để trống';
          }

          if (!validator.equals(this.state.password, this.state.passwordConfim)) {
            errors.passwordConfim = 'Passwords không khớp';
          }
        
    
        }
        if (err.response.status === 401) {
          console.log("Lỗi 401");

          errors.email = 'Email đã được đăng ký';
         
        }



        this.setState({
          errors: errors
        });
  
        
      })

      errors={};

  }
  classnames1 = () => {
    if (this.state.username) {

      return "form-control is-valid";
    }
    if (this.state.errors.username) {

      return "form-control is-invalid";
    }

    return "form-control ";

  }
  classnames2 = () => {
    if (this.state.email) {
      if (this.state.errors.email) {

        return "form-control is-invalid";
      }
      return "form-control is-valid";
    }

    if (this.state.errors.email) {

      return "form-control is-invalid";
    }
    return "form-control";

  }
  classnames3 = () => {
    if (this.state.password) {

      return "form-control is-valid";
    }
    if (this.state.errors.password) {

      return "form-control is-invalid";
    }

    return "form-control";

  }
  classnames4 = () => {
    if (this.state.passwordConfim) {
      if (this.state.errors.passwordConfim) {

        return "form-control is-invalid";
      }
      return "form-control is-valid";
    }
    if (this.state.errors.passwordConfim) {

      return "form-control is-invalid";
    }

    return "form-control";

  }
  render() {
    if (localStorage.getItem('jwtToken')) {
      return (<Redirect to={"/"} />)
    }
    console.log(this.state);

    return (

      <div className="Login1 mt-5 mb-5">




        <h1 className="text-white text-center"> Đăng Ký Người Dùng </h1>
        <form onSubmit={this.handleSubmit} method="POST">

          <div className="form-group text-light ">
            <label htmlFor="email">Họ Và Tên:</label>
            <input type="text" className={this.classnames1()} id="username" placeholder="Vd: Nguyễn Văn A" value={this.state.username}
              onChange={this.handleChange} />

            <div className="invalid-feedback">
              {this.state.errors.username}
            </div>
          </div>


          <div className="form-group text-light">
            <label htmlFor="email">Tài khoản:</label>
            <input type="email" className={this.classnames2()} id="email" aria-describedby="emailHelp" placeholder="email@gmail.com" value={this.state.email}
              onChange={this.handleChange} />
            <div className="invalid-feedback">
              {this.state.errors.email}
            </div>
          </div>
          <div className="form-group text-light">
            <label htmlFor="password">Mật khẩu:</label>
            <input type="password" className={this.classnames3()} id="password" placeholder="Mật khẩu" value={this.state.password}
              onChange={this.handleChange} />
            <div className="invalid-feedback">
              {this.state.errors.password}
            </div>
          </div>

          <div className="form-group text-light">
            <label htmlFor="password">Nhập lại mật khẩu:</label>
            <input type="password" className={this.classnames4()} id="passwordConfim" placeholder="Mật khẩu" value={this.state.passwordConfim}
              onChange={this.handleChange}
            />

            <div className="invalid-feedback">
              {this.state.errors.passwordConfim}
            </div>
          </div>


          <div className="text-center">
            <button type="submit" className="btn btn-default" >Đăng Ký </button>
            {/* disabled={!this.validateForm()} */}

          </div>
        
        </form>
      </div>

    );
  }
}


