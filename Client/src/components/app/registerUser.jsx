
import React from "react";
import validator from 'validator';
import axios from 'axios';

// import {userPostFetch} from '../redux/actions';
// import {connect} from 'react-redux';
// import { browserHistory } from 'react-router';
import { BrowserRouter as Redirect } from "react-router-dom";
// import Autho from './setAutho';
import md5 from 'md5';
function FormError(props) {
  if (props.isHidden) { return null; }
  return (
    <h3 className="display-4 text-danger">
      {props.errors}
    </h3>
  )
}

// 

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

  // validateForm() {
  //   return (this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0 && this.state.passwordConfim.length > 0);
  // }

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
       
    }


//tại sao post lại nằm trước hàm check textbox ????

// để thứ xem nó gủi gì về thôi 

    axios.post('/api/registerUser', newUser)
    .then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err)
    })



    if (validator.isEmpty(this.state.username)) {

      errors.username = 'Không được để trống';
    }
    if (validator.isEmpty(this.state.email)) {

      errors.email = 'Không được để trống';
    }

    if (!validator.isEmail(this.state.email)) {

      errors.email = 'Email không hợp lệ';
    }

    if (validator.isEmail(this.state.email)) {

     

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

    this.setState({
      errors: errors
    });


    // axios.post('http://localhost:4000/users/signin',{user: this.state})

    // .then(response=> {
    //   if (response != null) {

    //     this.setState({
    //       errors: response.data.success
    //     });
    //   } else {
    //     console.log('problem');
    //   } 
    // })

    // .catch(err => {
    //   // console.log(err.response);
    //   if(err.response.data.errors)
    //   {
    //     this.setState( {errors: err.response.data.errors })
    //     // console.log(err.response);
    //   }
    //   if(err.response.data.errorMessage)
    //   {
    //     this.setState( {errors: err.response.data.errorMessage.message })
    //     // console.log(err.response);
    //   }


    // });

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


          <div className="text-center">
            <button type="submit" className="btn btn-default" >Đăng Ký </button>
            {/* disabled={!this.validateForm()} */}

          </div>
          <div className="text-center text-danger">
            <FormError
              isHidden={this.state.isInputValid}
              errorMessage={this.state.errors}
            />

            <h2 className="text-danger">{}</h2>
          </div>
        </form>
      </div>

    );
  }
}


