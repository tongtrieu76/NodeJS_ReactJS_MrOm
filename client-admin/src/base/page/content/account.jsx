import React, { Component } from "react";
import Modal from "react-modal";
import UserDetail from "./accounts/userdetail.jsx";
import * as dateformat from "dateformat";

import "../../public/css/account.css";

//set app cho modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "93%",
    width: "60%",
    backgroundColor: "rgb(239, 248, 248)"
  }
};

class Account extends Component {

  //contrustor khởi tạo các state và con trỏ this
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      loadload: false,
      datas: [],
      datas_1: [],
      datas_user: [],
      datas_driver: [],
      modalIsOpen: false,
      modalIsOpen1: false,
      details: {}
    };
    this.openformthemnguoidung = this.openformthemnguoidung.bind(this);
    this.openformthemtaixe = this.openformthemtaixe.bind(this);
    this.cancelbutton = this.cancelbutton.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openform = this.openform.bind(this);
  }
  // end

  //các mount của reactJS
  componentWillMount() {
    // console.log("WILL");
  }
  componentDidMount() {
    // console.log("DID");
    fetch("http://localhost:4000/api/account")
      .then(response => response.json())
      .then(result => {
        var arr_user = [];
        var arr_driver = [];
        for (var i = 0; i < result.length; i++) {
          //change status number-> text
          if (result[i].Status === 96) {
            result[i].Status = "Hoạt động";
          } else if (result[i].Status === 69) {
            result[i].Status = "Khoá";
          } else if (result[i].Status === 0) {
            result[i].Status = "Chưa kích hoạt";
          } else {
            result[i].Status = "Khoá (hack random number role)";
          }

          //push array user,driver
          if (result[i].Role === 0) {
            arr_user.push(result[i]);
          } else if (result[i].Role === 2) {
            arr_driver.push(result[i]);
          }

          //change loại
          if (result[i].Role === 0) {
            result[i].Role = "Khách hàng";
          } else if (result[i].Role === 2) {
            result[i].Role = "Tài xế";
          } else if (result[i].Role === 1) {
            result[i].Role = "Admin";
          } else {
            result[i].Role = "Bug!";
          }

          //
          result[i].CreateDate = dateformat(
            new Date(result[i].CreateDate),
            "isoDate"
          );
        }
        this.setState({
          isLoaded: true,
          datas: result,
          datas_user: arr_user,
          datas_driver: arr_driver
        });
        this.ham();
      })
      .catch(error => this.setState({ error, isLoading: false }));

    //select id để show modal
    Modal.setAppElement("#open_modal_1");
  }
  // end

  //event display open form them nguoi dung va them tai xe
  openformthemnguoidung() {
    var x = document.getElementById("them-nguoi-dung");
    var y = document.getElementById("them-tai-xe");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
    }
  }
  openformthemtaixe() {
    var x = document.getElementById("them-nguoi-dung");
    var y = document.getElementById("them-tai-xe");
    if (y.style.display === "none") {
      y.style.display = "block";
      x.style.display = "none";
    } else {
      y.style.display = "none";
    }

    document.getElementById("content-1").style.height = "90vh";
  }
  // end

  //cancel button trong form them nguoi dung,them tai xe
  cancelbutton() {
    var x = document.getElementById("them-nguoi-dung");
    var y = document.getElementById("them-tai-xe");
    x.style.display = "none";
    y.style.display = "none";
  }
  // end

  //modal form
  // -- open modal form chi tiet
  openModal(username) {
    var detail = {};
    let data = [];
    data = this.state.datas;
    for (var i = 0; i < data.length; i++) {
      if (data[i].UserName === username) {
        detail = data[i];
        break;
      }
    }
    if (detail.Role === "Khách hàng") {
      this.setState({ modalIsOpen: true, details: detail });
    } else if (detail.Role === "Tài xế") {
      this.setState({ modalIsOpen1: true, details: detail });
    } else {
      this.setState({ modalIsOpen: true, details: detail });
    }
  }
  // -- close modal form chi tiet
  closeModal() {
    this.setState({ modalIsOpen: false, modalIsOpen1: false, details: {} });
  }
  // end

  // -- cái này không biết lúc viết để làm gì :3 :3 :3
  openform(obj) {
    this.openModal();
  }
  // end

  //các event gọi api thao tác với các account
  // -- event xóa tài khoản.
  xoataikhoan(item) {
    if (item.Role === "Admin") {
      alert("Không thể xóa tài khoản admin!");
    } else if (item.Role === "Khách hàng" || item.Role === "Tài xế") {
      var x = window.confirm("Bạn có chắc chắn muốn xóa tài khoản "+ item.UserName + " này!");
      if(x){
        const url = "http://localhost:4000/api/user/deleteacc";
      var status = 0;

      //obj data send post
      var obj = { _id: item._id, Token: item.Token };
      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          status = res.status;
          return res.text();
        })
        .then(response => {
          if (status === 200 && response === "success") {
            console.log(status + " : " + response);
            alert("Cập nhật thành công!");
            this.componentDidMount(this);
          } else {
            alert("Cập nhật thất bại!");
            console.log("ERROR: " + status + " : " + response);
          }
        })
        .catch(error => {
          alert("Đã xảy ra lỗi trong quá trình cập nhật! \nVui lòng thử lại!");
          console.error("Error:", error);
        });
      } else {

      }
    } else {
      alert("Bạn đã hack không thành công!");
    }
  }
  // -- event lock,unlock,active tài khoản.
  lockandunlock(item) {
    const url = "http://localhost:4000/api/user/setstatus";
    // if(item.Status === "Chưa kích hoạt"){//status == 0 -> 96
    //   // item.Status = 0;
    // } else if(item.Status === "Hoạt động"){//status == 96 -> 69
    //   // item.Status = 96;
    // } else if(item.Status === "Khoá"){//status == 69 -> 96
    //   // item.Status = 69;
    // } else {//status == 0 -> 96
    //   // item.Status = 33;
    // }
    var status = 0;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        status = res.status;
        return res.text();
      })
      .then(response => {
        if (status === 200 && response === "success") {
          console.log(status + " : " + response);
          alert("Cập nhật thành công!");
          this.componentDidMount(this);
        } else {
          alert("Cập nhật thất bại!");
          console.log("ERROR: " + status + " : " + response);
        }
      })
      .catch(error => {
        alert("Đã xảy ra lỗi trong quá trình cập nhật! \nVui lòng thử lại!");
        console.error("Error:", error);
      });
  }
  // -- event đổi mật khẩu tài khoản.
  doimatkhau(item) {
    var x = prompt(
      "Tài khoản: " + item.UserName + "\nVui lòng nhập mật khẩu muốn đổi",
      ""
    );
    if (x) {
      const url = "http://localhost:4000/api/user/changepassword";
      const obj = { _id: item._id, Token: item.Token, Newpass: x };
      var status = 0;
      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          status = res.status;
          return res.text();
        })
        .then(response => {
          if (status === 200 && response === "success") {
            console.log(status + " : " + response);
            alert("Cập nhật thành công!");
            this.componentDidMount(this);
          } else if (
            status === 400 &&
            response ===
              "Vui lòng đổi mật khẩu khác vì mật khẩu này đã được đổi gần đây"
          ) {
            alert(
              "Mật khẩu này trùng với mật khẩu hiện tại hoặc trùng với 5 mật khẩu được đổi gần nhất!\nVui lòng đổi lại bằng mật khẩu khác!"
            );
          } else {
            alert("Cập nhật thất bại!");
            console.log("ERROR: " + status + " : " + response);
          }
        })
        .catch(error => console.error("Error:", error));
    } else {
    }
  }
  // end

  // đổi filter search sẽ đổ lại data vào table
  ham() {
    var x = document.getElementById("select-filter").value;
    if (x === "user") {
      this.setState({ datas_1: this.state.datas_user });
    } else if (x === "driver") {
      this.setState({ datas_1: this.state.datas_driver });
    } else if (x === "all") {
      this.setState({ datas_1: this.state.datas });
    } else {
      this.setState({ datas_1: [] });
    }
  }
  // end

  render() {
    // console.log("RENDER");
    const { datas_1 } = this.state;
    return (
      <div id="content-1" onLoad={this.ham.bind(this)}>
        <div id="open_modal_1" />
        {/* modal */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <button
            type="button"
            onClick={this.closeModal}
            id="btn-close"
            className="btn btn-light"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <UserDetail detail={this.state.details} />
        </Modal>
        <Modal
          isOpen={this.state.modalIsOpen1}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <button
            onClick={this.closeModal}
            id="btn-close"
            className="btn btn-secondary"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <center>
            <h3>Thông tin chi tiết tài khoản tài xế</h3>
          </center>
          <div className="col-md-12">
            <form>
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      id="staticEmail"
                      defaultValue="email@example.com"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        {/* END modal */}
        
        {/* Title của content */}
        <div className="col-md-12">
          <p id="title-content">Quản lý tài khoản khách hàng và tài xế</p>
        </div>
        {/* END Title của content */}
        
        {/* button thêm người dùng và thêm tài xế */}
        <div className="col-md-12">
          <button
            className="btn btn-success btn-them"
            onClick={this.openformthemnguoidung}
          >
            Thêm người dùng
          </button>
          <button className="btn btn-success" onClick={this.openformthemtaixe}>
            Thêm tài xế
          </button>
        </div>
        {/* END button thêm người dùng và thêm tài xế */}
        
        {/* form thêm người dùng */}
        <div className="col-md-12 group-them">
          <form className="form-horizontal" id="them-nguoi-dung">
            <div className="col-md-12">
              <hr />
            </div>
            <center>
              <p className="title-them">Tạo tài khoản người dùng</p>
            </center>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Tên đăng nhập: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập tên đăng nhập..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Mật khẩu: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="password"
                  className="form-control col-md-10"
                  placeholder="Nhập mật khẩu..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Nhập lại mật khẩu: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="password"
                  className="form-control col-md-10"
                  placeholder="Nhập lại mật khẩu..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Tên chủ tài khoản: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập tên chủ tài khoản..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Số điện thoại: <span className="span-must">(*)</span>
                  </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập số điện thoại..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Địa chỉ: <span className="span-must">(*)</span>
                  </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập địa chỉ..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Email: 
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập email..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Số CMND: 
                  </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập chứng minh nhân dân..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Ngày sinh: 
                  </label>
              </center>
              <div className="col-md-10">
                <input
                  type="date"
                  className="form-control col-md-10"
                  max = "9999-12-31"
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Trạng thái: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <label className="radio-inline">
                  <input type="radio" name="optradio" defaultChecked />
                  Kích hoạt
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio" />
                  Vô hiệu hóa
                </label>
              </div>
              <div className="form-group">
                <div className="col-md-2" />
                <div className="col-md-10">
                  <button type="button" className="btn btn-success">
                    Thêm
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-huybo"
                    onClick={this.cancelbutton}
                  >
                    Hủy bỏ
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* END form thêm người dùng */}
        
        {/* form thêm tài xế */}
        <div className="col-md-12 group-them">
          <form className="form-horizontal" id="them-tai-xe">
            <div className="col-md-12">
              <hr />
            </div>
            <center>
              <p className="title-them">Tạo tài khoản tài xế</p>
            </center>
            <div className="form-group">
              <center>
                <label className="col-md-2">
                  Tên đăng nhập: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập tên đăng nhập..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2">
                  Mật khẩu: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="password"
                  className="form-control col-md-10"
                  placeholder="Nhập mật khẩu..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2">
                  Nhập lại mật khẩu: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="password"
                  className="form-control col-md-10"
                  placeholder="Nhập lại mật khẩu..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2">
                  Tên chủ tài khoản: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập tên chủ tài khoản..."
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2">
                  Trạng thái: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <label className="radio-inline">
                  <input type="radio" name="optradio" defaultChecked />
                  Kích hoạt
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio" />
                  Vô hiệu hóa
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-2" />
              <div className="col-md-10">
                <button type="button" className="btn btn-success">
                  Thêm
                </button>
                <button
                  type="button"
                  className="btn btn-info btn-huybo"
                  onClick={this.cancelbutton}
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* END form thêm tài xế */}
        
        {/* thẻ hr nhìn cho nó phân định ranh giới ---> để cute thôi :* */}
        <div className="col-md-12">
          <hr />
        </div>
        {/* END thẻ hr nhìn cho nó phân định ranh giới ---> để cute thôi :* */}
        
        {/* thanh search và filter để tìm kiếm */}
        <div className="col-md-12 input-group">
          <input
            type="text"
            className="form-control close-open-modal"
            placeholder="Nhập từ khóa để tìm kiếm..."
            name="search"
          />
          <div className="input-group-btn">
            <button
              className="btn btn-outline-secondary close-open-modal"
              type="button"
            >
              <i className="glyphicon glyphicon-search" />
            </button>
            <select
              className="btn btn-info close-open-modal"
              type="button"
              onChange={this.ham.bind(this)}
              id="select-filter"
            >
              <option value="all">Tất cả</option>
              <option value="user">Người dùng</option>
              <option value="driver">Tài xế</option>
            </select>
          </div>
        </div>
        {/* END thanh search và filter để tìm kiếm */}
        
        {/* table show account */}
        <div className="col-md-12 group-them" id="content-content">
          <table className="table">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Name</th>
                <th>Trạng thái</th>
                <th>Loại</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {datas_1.map((item, i) => (
                <tr key={i}>
                  <td>{item.UserName}</td>
                  <td>{item.Name}</td>
                  <td>{item.Status}</td>
                  <td>{item.Role}</td>
                  <td>
                    <button
                      onClick={this.openModal.bind(this, item.UserName)}
                      className="btn btn-info"
                      id="btn-lock"
                    >
                      Chi tiết <span className="glyphicon glyphicon-edit" />
                    </button>
                    <button
                      className="btn btn-warning"
                      id="btn-lock"
                      onClick={this.lockandunlock.bind(this, item)}
                    >
                      Khóa/Mở khóa/Kích hoạt{" "}
                      <span className="glyphicon glyphicon-lock" />
                    </button>
                    <button
                      className="btn btn-warning"
                      id="btn-edit"
                      onClick={this.doimatkhau.bind(this, item)}
                    >
                      Đổi mật khẩu <span className="glyphicon glyphicon-cog" />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={this.xoataikhoan.bind(this, item)}
                      id="btn-delete"
                    >
                      Xóa <span className="glyphicon glyphicon-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END table show account */}
      </div>
    );
  }
}
export default Account; // Don’t forget to use export default!
