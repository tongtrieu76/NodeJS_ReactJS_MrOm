import React from "react";
import axios from 'axios';
// import {userPostFetch} from '../redux/actions';
// import {connect} from 'react-redux';
// import { browserHistory } from 'react-router';
import { BrowserRouter as  Redirect } from "react-router-dom";
import Autho from './setAutho';

function FormError(props) {
  if (props.isHidden) {return null;}
  return (
    <h3 className="display-4 text-danger">
        {props.errorMessage}
    </h3>
  )
}

const validateInput = (checkingText,checkingText2) => {
    
    
    
    if (checkingText === checkingText2) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Mật khẩu không khớp'
            };
        }
}

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",      
      email: "",
      password: "",
      passwordConfim: "",
      errors:"",
      errorMessage: ''
    };
  }

  validateForm() {
    return (this.state.passwordConfim === this.state.password)&&(this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0 && this.state.passwordConfim.length > 0);
  }
 
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
   
    console.log(this.state);

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.passwordConfim
    }
    // axios.post('http://localhost:4000/users/signin',{user: this.state})
    axios.post('/register', newUser)
      // .then(response=> {
      //   if (response != null) {
      //     this.setState({
      //       errors: response.data
      //     });
      //   } else {
      //     console.log('problem');
      //   } 
      // })
      .then(res => {
        if(res.data.errors)
        {
          this.setState({ errors: res.data.errors })
        }
        if(res.data.token)
        {
          // const token = res.data.token;
          // localStorage.setItem('jwtToken', token);
          // Autho(token);
           alert("Tạo Tài Khoản Thành Công");
          this.props.history.push("/");
         
          window.location.reload();
          
        }
       
      })
      .catch(err => console.log(err.response.data));

  }
  handleInputValidation = event => {
    const {  errorMessage } = validateInput(this.state.passwordConfim,this.state.password);
    this.setState({
    
      errorMessage: errorMessage
    })
    
  }
  render() {
    if(localStorage.getItem('jwtToken'))
    {
      return(<Redirect to={"/"}/>)
    }
    const errors = this.state.errors;
    console.log(this.state.isInputValid);
    return (
    
        <div className="Login mt-5 mb-5">
          <h1 className="text-white text-center"> Đăng Ký </h1>
          <form onSubmit={this.handleSubmit} method="POST">

          <div className="form-group text-light">
              <label htmlFor="email">Họ Và Tên:</label>
              <input type="text" className="form-control" id="username" placeholder="Vd: Nguyễn Văn A" value={this.state.username}
                onChange={this.handleChange} />

            </div>


            <div className="form-group text-light">
              <label htmlFor="email">Tài khoản:</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email@gmail.com" value={this.state.email}
                onChange={this.handleChange} />

            </div>
            <div className="form-group text-light">
              <label htmlFor="password">Mật khẩu:</label>
              <input type="password" className="form-control" id="password" placeholder="Mật khẩu" value={this.state.password}
                onChange={this.handleChange} />
            </div>

            <div className="form-group text-light">
              <label htmlFor="password">Nhập lại mật khẩu:</label>
              <input type="password" className="form-control" id="passwordConfim" placeholder="Mật khẩu" value={this.state.passwordConfim}
                onChange={this.handleChange}
                onBlur={this.handleInputValidation}

                />
            </div>


            <div className="text-center">
              <button type="submit" className="btn btn-default" disabled={!this.validateForm()}>Đăng Nhập</button>
            </div>
            <div className="text-center text-danger">
              <FormError 
              isHidden={this.state.isInputValid} 
              errorMessage={this.state.errorMessage}
               />

              <h2 className="text-danger">{errors}</h2>
            </div>
          </form>
        </div>
     
    );
  }
}

export default Register;
