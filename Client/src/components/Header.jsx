import React from 'react';

import '../css/App.css';
import Home from './app/Home';
import Login from './app/Login';
import Register from './app/Register';
// import { connect } from 'react-redux';
import Autho from './app/setAutho';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
const isActive = (path, match, location) => !!(match || path === location.pathname);

class Header extends React.Component {
  logout(e) {
   
   localStorage.removeItem('jwtToken');
   Autho(false);
   this.props.history.push("/");
    window.location.reload();
  }
  
  
  render() {
    const  isAuthenticated  = localStorage.getItem('jwtToken');
    const userLinks = (
      
      <li>
        <NavLink
          exact
            activeClassName="active"
          className="nav-link text-light font-weight-bold" onClick={this.logout.bind(this)} to='#'>
          Đăng Xuất
    </NavLink>
      </li>

    );
    const guestLinks = (  
      <div>
        <li >
          <NavLink
            exact
            activeClassName="active"
            isActive={isActive.bind(this, '/login')}
            className="nav-link text-light font-weight-bold" to='/login'>
            Đăng Nhập
              </NavLink>

        </li>
        <li >
          <NavLink
            exact
            activeClassName="active"
            isActive={isActive.bind(this, '/register')}
            className="nav-link text-light font-weight-bold" to='/register'>
            Đăng Ký
              </NavLink>
      
        </li>
      </div>

    );

    return (
      <Router>
        <nav className="navbar navbar-expand-sm navbar-light static-top">
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
            <div className="collapse navbar-collapse text-info" id="navbarResponsive">
              <ul className="navbar-nav ml-auto text-center">
                <li>
                  <NavLink
                    exact
                    activeClassName="active"
                    isActive={isActive.bind(this, '/')}
                    className="nav-link text-light font-weight-bold" to='/'>
                    Trang Chủ
              </NavLink>

                </li>

                {isAuthenticated ? userLinks : guestLinks}

              </ul>
            </div>
          </div>
        </nav>

        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Router>
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