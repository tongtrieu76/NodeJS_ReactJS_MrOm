import React from "react";
import validator from 'validator';
import axios from 'axios';
import { BrowserRouter as Redirect } from "react-router-dom";
import Autho from './setAutho';
import md5 from 'md5';


export default class RegisterDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfim: "",
      errors: "",
      IdentityCard: "",
      NumberPhone: "",
      CarNumber: "",


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
      IdentityCard: this.state.IdentityCard,
      NumberPhone: this.state.NumberPhone,
      CarNumber: this.state.CarNumber,
    }


    axios.post('/api/registerDriver', newUser)
      .then(res => {
        console.log(res.data)
       

         localStorage.setItem('jwtToken', res.data.Token);
         localStorage.setItem('jwtid', res.data.id);
         localStorage.setItem('jwtRole', res.data.Role);
          Autho(res.data.Token);
        // alert("Tạo Tài Khoản Thành Công");
        //  this.props.history.push("/");
       
        // window.location.reload();

      })
      .catch(err => {
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
      });

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


  classnames5 = () => {
    if (this.state.errors.IdentityCard) {

      return "form-control is-invalid";
    }
    else {

      return "form-control";
    }
  }


  classnames6 = () => {
    if (this.state.errors.NumberPhone) {

      return "form-control is-invalid";
    }
    else {

      return "form-control";
    }
  }


  classnames7 = () => {
    if (this.state.errors.CarNumber) {

      return "form-control is-invalid";
    }
    else {

      return "form-control";
    }
  }
  render() {
    if (localStorage.getItem('jwtToken')) {
      return (<Redirect to={"/"} />)
    }
    console.log(this.state);

    return (

      <div className="Login2 mt-5 mb-5">




        <h1 className="text-white text-center"> Đăng Ký Tài Xế</h1>
        <form onSubmit={this.handleSubmit} method="POST">


          <div className="row">
            <div className="col-md-6">
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
                <input type="text" className={this.classnames2()} id="email" aria-describedby="emailHelp" placeholder="email@gmail.com" value={this.state.email}
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

            </div>

            <div className="col-md-6">

              <div className="form-group text-light">
                <label htmlFor="password">CMND:</label>
                <input type="text" className={this.classnames5()} id="IdentityCard" placeholder="123456789" value={this.state.IdentityCard}
                  onChange={this.handleChange}
                />

                <div className="invalid-feedback">
                  {this.state.errors.IdentityCard}
                </div>
              </div>

              <div className="form-group text-light">
                <label htmlFor="password">Số điện thoại:</label>
                <input type="text" className={this.classnames6()} id="NumberPhone" placeholder="0327247666" value={this.state.NumberPhone}
                  onChange={this.handleChange}
                />

                <div className="invalid-feedback">
                  {this.state.errors.NumberPhone}
                </div>
              </div>


              <div className="form-group text-light">
                <label htmlFor="password">Biển Số Xe:</label>
                <input type="text" className={this.classnames7()} id="CarNumber" placeholder="61-H1 12345" value={this.state.CarNumber}
                  onChange={this.handleChange}
                />

                <div className="invalid-feedback">
                  {this.state.errors.CarNumber}
                </div>
              </div>

            </div>
          </div>




          <div className="text-center">
            <button type="submit" className="btn btn-default"> Đăng Ký </button>
            {/* disabled={!this.validateForm()} */}

          </div>

        </form>
      </div>

    );
  }
}


