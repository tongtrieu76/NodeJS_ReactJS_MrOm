import React, { Component } from "react";
import "../public/css/header.css";
class Header extends Component {
  render() {
    return (
      <div id="hd">
        <div className="col-md-2" id="logo" />
        <div className="col-md-8">
          <center>
            <h1>Mít tơ ôm</h1>
          </center>
        </div>
        <div className="col-md-2">
          <center>
            <button className="btn btn-success">User</button>
            <button className="btn btn-warning">Đăng xuất</button>
          </center>
        </div>
      </div>
    );
  }
}
export default Header; // Don’t forget to use export default!
