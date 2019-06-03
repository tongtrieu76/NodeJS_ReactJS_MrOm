import React from 'react';

import '../css/App.css';
import Home from './app/Home';
import Error404 from './app/Error404';
import Login from './app/Login';
import Register from './app/Register';
import Admin from './app/Admin';
// import { connect } from 'react-redux';
import Autho from './app/setAutho';

import { BrowserRouter , Route, NavLink, Switch } from "react-router-dom";
const isActive = (path, match, location) => !!(match || path === location.pathname);

class Header extends React.Component {
  logout(e) {

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtUser');
    Autho(false);
    this.props.history.push("/");
    window.location.reload();
  }


  render() {
    const isAuthenticated = localStorage.getItem('jwtToken');

    const role = localStorage.getItem('jwtUser');
    const isAdmin = (
      <li>
        <NavLink
          exact
          activeClassName="active"
          isActive={isActive.bind(this, '/admin')}
          className="nav-link text-light font-weight-bold" to='/admin'>
          Admin
</NavLink>

      </li>
    );
    const userLinks = (
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
        {
          role ? null : isAdmin
        }
        <li>
          <NavLink
            exact
            activeClassName="active"
            className="nav-link text-light font-weight-bold" onClick={this.logout.bind(this)} to='#'>
            Đăng Xuất
    </NavLink>
        </li>
      </ul>
    );
    const guestLinks = (
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
            isActive={isActive.bind(this, '/register/user')}
            className="nav-link text-light font-weight-bold" to='/register/user'>
            Đăng Ký
              </NavLink>

        </li>
      </ul>

    );

    return (
      <BrowserRouter>
    

      
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



              {isAuthenticated ? userLinks : guestLinks}


            </div>
          </div>
        </nav>
        <Switch>
        <Route  path='/' exact component={Home} />
        <Route  path='/login' component={Login} />
        <Route  path='/register/user' component={Register} />
        <Route  path='/admin' component={Admin} />
        <Route  path='/*' component={Error404} />
        
        </Switch>
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