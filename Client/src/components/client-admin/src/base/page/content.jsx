import React, { Component } from "react";
import Account from "./content/account.jsx";
// import Header from "./header.jsx";
// import inforAccount from "./content/inforAccount.jsx";
import thongke from "./content/thongke.jsx";
import trips from "./content/trips";
//css
import "../public/css/account.css";
import "../public/css/menu.css";
import "../public/css/content.css";

//js
// import "../public/js/menu";

import { BrowserRouter, Route, Link } from "react-router-dom";
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 123
    };
    this.hanlemenu1 = this.hanlemenu1.bind(this);
    this.hanlemenu2 = this.hanlemenu2.bind(this);
    this.hanlemenu3 = this.hanlemenu3.bind(this);
  }
  hanlemenu1(){
    var x = document.getElementById("menu-1");
    x.style.backgroundColor = "rgb(178, 206, 214)";
    x.style.width = "105%";
    x.style.fontSize = "2vh";

    var y = document.getElementById("menu-2");
    y.style.backgroundColor = "rgb(203, 211, 210)";
    y.style.width = "80%";
    y.style.fontSize = "1.5vh";

    var z = document.getElementById("menu-3");
    z.style.backgroundColor = "rgb(203, 211, 210)";
    z.style.width = "80%";
    z.style.fontSize = "1.5vh";
  }
  hanlemenu2(){
    var x = document.getElementById("menu-2");
    x.style.backgroundColor = "rgb(178, 206, 214)";
    x.style.width = "105%";
    x.style.fontSize = "2vh";

    var y = document.getElementById("menu-1");
    y.style.backgroundColor = "rgb(203, 211, 210)";
    y.style.width = "80%";
    y.style.fontSize = "1.5vh";

    var z = document.getElementById("menu-3");
    z.style.backgroundColor = "rgb(203, 211, 210)";
    z.style.width = "80%";
    z.style.fontSize = "1.5vh";
  }
  hanlemenu3(){
    var x = document.getElementById("menu-3");
    x.style.backgroundColor = "rgb(178, 206, 214)";
    x.style.width = "105%";
    x.style.fontSize = "2vh";

    var y = document.getElementById("menu-1");
    y.style.backgroundColor = "rgb(203, 211, 210)";
    y.style.width = "80%";
    y.style.fontSize = "1.5vh";

    var z = document.getElementById("menu-2");
    z.style.backgroundColor = "rgb(203, 211, 210)";
    z.style.width = "80%";
    z.style.fontSize = "1.5vh";
  }
  render() {
    return (
      <BrowserRouter>
        <div id="menu" className="col-md-2">
          <div id="style-menu">
            <Link to="/" id="menu-1" onClick={this.hanlemenu1}> Tài khoản </Link>
            <Link to="/b" id="menu-2" onClick={this.hanlemenu2}> Quản lý chuyến </Link>
            <Link to="/c" id="menu-3" onClick={this.hanlemenu3}> Thống kê </Link>
          </div>
        </div>
        <div id="content_1xx" className="col-md-10">
          <div id="style-content">
            <Route exact path="/" component={Account} />
            <Route path="/b" component={trips} />
            <Route path="/c" component={thongke} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Content; // Don’t forget to use export default! //
