
import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import registerUser from './registerUser';
import registerDriver from './registerDriver';



const isActive = (path, match, location) => !!(match || path === location.pathname);


export default class Register extends Component {


  render() {
    return (
      <Router>
      <div className="container">
      <div className="row">
        <div className="col-md-3"> </div>
          <div className="col-md-3"> 
           <NavLink
            exact
            activeClassName="active"
            isActive={isActive.bind(this, '/register/user')}
            className="nav-link text-light text-center font-weight-bold" to='/register/user'>
            Đăng Ký Người Dùng
              </NavLink>
              </div>

          <div className="col-md-3"> 
           <NavLink
            exact
            activeClassName="active"
            isActive={isActive.bind(this, '/register/driver')}
            className="nav-link text-light text-center font-weight-bold" to='/register/driver'>
            Đăng Ký Tài Xế
              </NavLink>
              </div>
              <div className="col-md-3"> </div>
        </div>

      </div>
       
        <Route path='/register/user' exact component={registerUser} />
        <Route path='/register/driver' exact component={registerDriver} />
      </Router>

    );
  }
}
