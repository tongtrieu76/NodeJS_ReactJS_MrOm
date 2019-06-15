import React from 'react';

import '../css/App.css';
import Home from './Home';
import Error404 from './404/Error404';
import Login from './login/Login';
import Register from './register/Register';
import Admin from './Admin';

import InfoUser from './info/infoUser';
import InfoDriver from './info/infoDriver';
import Adminpage from './client-admin/src/admin/home';
import axios from 'axios';

// import setAuthorizationToken from './action/setAuthorizationToken';
import { setCurrentUser } from './action/authActions'
import jwt from 'jsonwebtoken';

import { logout } from './action/authActions'



import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

const isActive = (path, match, location) => !!(match || path === location.pathname);




class Header extends React.Component {


  render() {



    var role;
    var id;
    if (localStorage.jwtToken) {
      // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
      role = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
      id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id


    } else {
      role = -1;
    }

    function TrangChu() {
      return (
        <li>
          <NavLink
            exact
            activeClassName="active"
            isActive={isActive.bind(this, '/')}
            className="nav-link text-light font-weight-bold" to='/'>
            Trang Chủ
        </NavLink>

        </li>

      );
    }
    // function TrangChuAdmin() {
    //   return (
    //     <li>
    //       <NavLink
    //         exact
    //         activeClassName="active"
    //         isActive={isActive.bind(this, '/adminpage')}
    //         className="nav-link text-light font-weight-bold" to='/adminpage'>
    //        Admin
    //     </NavLink>

    //     </li>

    //   );
    // }
    function DangXuat() {
      function handleClick() {

        logout();
      }
      return (
        <li>
          <NavLink
            exact
            activeClassName="active"
            className="nav-link text-light font-weight-bold" onClick={handleClick} to='#'>
            Đăng Xuất
      </NavLink>
        </li>
      )
    }

    function TrangAdmin() {
      return (
        <ul className="navbar-nav ml-auto text-center">
          {TrangChu()}

          <li>
            <NavLink
              exact
              activeClassName="active"
              isActive={isActive.bind(this, '/admin')}
              className="nav-link text-light font-weight-bold" to='/admin'>
              Admins
        </NavLink>

          </li>

          {DangXuat()}
        </ul>
      );
    }


    function TrangUser() {

      var url = "/user/" + id;
     

      return (
        <ul className="navbar-nav ml-auto text-center">
          {TrangChu()}

          <li>
            <NavLink
              exact
              activeClassName="active"
              isActive={isActive.bind(this, url)}
              className="nav-link text-light font-weight-bold" to={url}>
              Thông Tin Cá Nhân

            </NavLink>

          </li>

          {DangXuat()}
        </ul>
      );
    }

    function TrangDriver() {
      var url = "/driver/" + id;

      return (
        <ul className="navbar-nav ml-auto text-center">
          {TrangChu()}

          <li>
            <NavLink
              exact
              activeClassName="active"
              isActive={isActive.bind(this, url)}
              className="nav-link text-light font-weight-bold" to={url}>
              Thông Tin Cá Nhân
        </NavLink>

          </li>

          {DangXuat()}
        </ul>
      );
    }



    function defaults() {
      return (
        <ul className="navbar-nav ml-auto text-center">
          {TrangChu()}

          <li >
            <NavLink
              exact
              activeClassName="active"
              isActive={isActive.bind(this, '/login')}
              className="nav-link text-light font-weight-bold" to='/login'>
              Đăng Nhập
         </NavLink>
          </li>

          <li>
            <NavLink
              exact
              activeClassName="active"
              isActive={isActive.bind(this, '/register/user')}
              className="nav-link text-light font-weight-bold" to='/register/user'>
              Đăng Ký
        </NavLink>

          </li>
{
  // TrangChuAdmin()
}
        </ul>
      );
    }

    function ifrender() {
      if (role !== 0 && role !== 1 && role !== 2) {
        return (
          defaults()
        )
      }

      if (role === 0) {   // user

        return (
          TrangUser()
        )
      }

      if (role === 2) {    //driver

        return (
          TrangDriver()
        )
      }
      if (role === 1) {  // admin

        return (
          TrangAdmin()
        )
      }



    }
    return (
      <BrowserRouter>



        <nav className="navbar navbar-expand-sm navbar-light static-top ">
          <div className="container">

            <p className="text-white">
              <NavLink to='#'>
                Mr.Ôm
              </NavLink></p>


            <button
              className="navbar-toggler bg-white"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"

            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse text-info nabar25" id="navbarResponsive">


              {ifrender()}


            </div>
          </div>
        </nav>
        <div className="nabar75">
        <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register/user' component={Register} />
        <Route exact path='/admin' component={Adminpage} />
        <Route exact path='/user/:id' component={InfoUser} />
        <Route exact path='/driver/:id' component={InfoDriver} />
     

        {/* <Route path='/*' component={Error404} />   */}
        <Route component={Error404} />
      </Switch>
        </div>
       

      </BrowserRouter>
    );
  }
}
export default Header;
// Header.propTypes={
//   auth: React.propTypes.object.isRequired
// }

// function mapDispatchToProps(state)
// {
// return {
//   auth: state.auth
//   };
// }
// export default connect(mapDispatchToProps)(Header);