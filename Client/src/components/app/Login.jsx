import React, { Component } from "react";
import axios from 'axios';
// import Autho from './setAutho';
// import Error404 from './Error404';
import {  Link, Redirect} from "react-router-dom";
// import {connect} from 'react-redux';
// import { BrowserRouter , Route, Link, Switch ,Redirect} from "react-router-dom";
import { login } from "./authActions";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: "",
      password: "",
      errors:"",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();

    const newUser = {

      email: this.state.email,
      password: this.state.password,
      
    }
    const data ={
      Token:"g",
      id:1,
      Role:1
    }
    axios.post('/login', newUser).then( login(data) 
    
    ).catch( login(data))
      // .then(res => {
      //   if(res.data.err)
      //   {
      //     this.setState({ errors: res.data.err })
      //   }
      //   if(res.data.token)
      //   {
      //     if(res.data.user)
      //     {
      //       const token = res.data.token;
      //       const user  = res.data.user ;
      //       localStorage.setItem('jwtToken', token);
      //       localStorage.setItem('jwtUser', user);
      //       // Autho(token);
  
      //      // this.props.history.push("/");
      //       window.location.reload();
      //     }
      //     else{
      //       const token = res.data.token;
            
      //       localStorage.setItem('jwtToken', token);
           
      //       // Autho(token);
  
        
      //       window.location.reload();
      //     }
         
      //   }
       
        
        
      // }).catch(err => console.log(err.response.data));  

  }

  render() {

    if(localStorage.getItem('jwtToken'))
    {
      return(<Redirect to={"/"}/>)
    }
    const errors = this.state.errors;
   
    return (
      
      <div className="Login mt-5 mb-5">
        <h1 className="text-white text-center"> Đăng Nhập </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group text-light">
            <label htmlFor="email">Tài Khoản:</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Nhập email" value={this.state.email}
              onChange={this.handleChange} />

          </div>
          <div className="form-group text-light">
            <label htmlFor="password">Mật Khẩu:</label>
            <input type="password" className="form-control" id="password" placeholder="Mật khẩu" value={this.state.password}
              onChange={this.handleChange} />
          </div>


          <div className="text-center">
            <button type="submit" className="btn btn-default" disabled={!this.validateForm()}>Đăng Nhập</button>
          </div>
          <h4 className="text-danger text-center mt-3">{errors}</h4>
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