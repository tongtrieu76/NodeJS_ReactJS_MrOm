import React from 'react'; import './App.css'; function App() { return (
<div>
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-2">
        <center>
          <img
            id="img_home"
            src="http://tuanbaovannghetphcm.vn/uploads/images/Anh-minh-hoa---Goc-nho-Sai-Gon---Xe-om-Sai-Gon_1024x699.png"
            alt="Trang chủ"
          />
        </center>
      </div>
      <div className="col-sm-8">
        <center>
          <h1 id="Title_web">Mít tơ ôm</h1>
        </center>
      </div>
      <div className="col-sm-2">
        <div id="login_signup">
          <center>
            <button type="button" className="btn btn-primary" id="btn-login">Login</button>
          <button type="button" className="btn btn-primary" id="btn-signup">Signup</button>
          </center>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12" id="menu">
        <div className="form-group" id="book_xe">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Điểm đón..."/>
            <input type="text" className="form-control" placeholder="Điểm đến..."/>
            <div className="input-group-prepend">
              <button className="input-group-text" id="btn-timxe">Tìm xe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-12" id="slidebar_content">
        <div>
          <button type="button" className="btn btn-info" id="get_my_location">
            Vị trí của tôi
          </button>
        </div>
        <div id="mapid"></div>
      </div>
    </div>
  </div>
  <div id="footer_contact">
    <div>
      <a href="gmail.com">Gmail</a><a href="google.com">Gooogle</a
      ><a href="twitter.com">Twitter</a>
    </div>
    <div id="design_inf">
      <p>Desgin by Tống Triều - using bootstrap</p>
    </div>
  </div>
</div>
); } export default App;
