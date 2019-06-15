import React, { Component } from "react";
import "../../../public/css/account/userdetail.css";
import * as dateformat from "dateformat";
class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      info: {},
      error: false,
      isLoading: false
    };
  }
  componentWillMount() {}
  componentDidMount() {
    if (this.props.detail.Status === "Hoạt động") {
      document.getElementById("radio-active").checked = "True";
    } else if (this.props.detail.Status === "Khóa") {
      document.getElementById("radio-lock").checked = "True";
    } else if (this.props.detail.Status === "Chưa kích hoạt") {
      document.getElementById("radio-unactive").checked = "True";
    } else {
      document.getElementById("radio-lock").checked = "True";
    }

    //có đang hoạt động
    if (this.props.detail.StatusConnect === 1) {
      document.getElementById("StatusConnect").value = "Có";
    } else if (this.props.detail.StatusConnect === 0) {
      document.getElementById("StatusConnect").value = "Không";
    } else {
      document.getElementById("StatusConnect").value = "sdsadsadsad";
    }

    //lý do khóa
    if (
      this.props.detail.WhyLock === "null" ||
      this.props.detail.WhyLock === null
    ) {
      document.getElementById("WhyLock").value =
        "Tài khoản hiện đang hoạt động!";
    } else {
      document.getElementById("WhyLock").value = "Tsadsdsadadg!";
    }

    //
    fetch("http://localhost:4000/api/driver/" + String(this.props.detail._id))
      .then(response => response.json())
      .then(result => {
        result.Birthday = dateformat(new Date(result.Birthday), "isoDate");
        result.DateSignup = dateformat(new Date(result.DateSignup), "isoDate");
        // console.log(result);
        this.setState({ info: result });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  checkinputtext(x) {
    if (x === null || x === "") {
      return false;
    }

    //check space
    var temped = 0;
    var arr = x.split("");
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== " ") {
        temped++;
      }
    }
    if (temped === 0) {
      return false;
    } else {
      return true;
    }
  }

  capnhatdriver() {
    var publicflag = 0;

    //tên đăng nhập
    var UserName = document.getElementById("UserName");

    //mật khẩu
    var Password = document.getElementById("Password");

    //mật khẩu again
    var PasswordAgain = document.getElementById("PasswordAgain");

    //tên chủ tài khoản
    var Name = document.getElementById("Name");

    //số điện thoại
    var NumberPhone = document.getElementById("NumberPhone");

    //địa chỉ
    var Address = document.getElementById("Address");
    //email
    var Email = document.getElementById("Email");

    //chứng minh nhân dân
    var IdentityCard = document.getElementById("IdentityCard");
    //sinh nhật
    var Birthday = document.getElementById("Birthday");

    //trạng thái
    var Status = document.querySelector('input[name="optradio"]:checked');

    if (publicflag === 0) {
      var obj = {
        UserName: UserName.value,
        Password: Password.value,
        Name: Name.value,
        NumberPhone: NumberPhone.value,
        Address: Address.value,
        Email: Email.value,
        IdentityCard: IdentityCard.value,
        Birthday: Birthday.value,
        Status: Status.value
      };

      alert("Check true");
      const url = "http://localhost:4000/api/user/add";

      this.openloading(this);
      //fetch post call api
      var status = 0;
    //   fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify(obj),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //     .then(res => {
    //       status = res.status;
    //       return res.text();
    //     })
    //     .then(uyh*-
    //       res =>
    //         async function() {
    //           if (status === 200 && res === "success") {
    //             setTimeout(() => {
    //               console.log(status + " : " + res);
    //               alert("Thêm người dùng thành công!");
    //               this.resetinput(this);
    //               this.componentDidMount(this);
    //             }, 5000);
    //           } else if (status === 400 && res === "Email tồn tại") {
    //             console.log(status + " : " + res);
    //             alert("Email tồn tại, vui lòng dùng email khác!");
    //           } else if (status === 400 && res === "UserName tồn tại") {
    //             console.log(status + " : " + res);
    //             alert(
    //               "Tên đăng nhập tồn tại, vui lòng dùng tên đăng nhập khác!"
    //             );
    //           } else {
    //             console(status + " : " + res);
    //             alert("Đã xảy ra lỗi bất ngờ, vui lòng thử lại!");
    //           }
    //         }
    //     )
    //     .catch(error => console.error("Error:", error));
    } else {
      alert("Vẫn còn trường trống!");
    }
  }
  render() {
    var x = this.props.detail;
    var info = this.state.info;
    return (
      <div>
        <div className="col-md-12">
          <form>
            <div id="view-detail">
              <div className="form-group row">
                <p className="title-viewdetail">Thông tin cá nhân tài xế</p>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Tên đăng nhập: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="UserName"
                    placeholder="Tên đăng nhập..."
                    defaultValue={x.UserName}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Tên người dùng: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder="Password"
                    defaultValue={x.Name}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Trạng thái: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  {/* activate */}
                  <input
                    className="form-check-input"
                    type="radio"
                    name="active"
                    id="radio-active"
                    defaultValue="active"
                  />
                  <label className="form-check-label" htmlFor="active">
                    Hoạt động
                  </label>

                  {/* lock */}
                  <input
                    className="form-check-input"
                    type="radio"
                    name="active"
                    id="radio-lock"
                    defaultValue="lock"
                  />
                  <label className="form-check-label" htmlFor="lock">
                    Khóa
                  </label>

                  {/* un active */}
                  <input
                    className="form-check-input"
                    type="radio"
                    name="active"
                    id="radio-unactive"
                    defaultValue="lock"
                  />
                  <label className="form-check-label" htmlFor="lock">
                    Chưa kích hoạt
                  </label>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Mã truy cập: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="Token"
                    placeholder="Mã truy cập"
                    defaultValue={x.Token}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Lý do khóa:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="WhyLock"
                    placeholder="Lý do khóa"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Có đang hoạt động:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="StatusConnect"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Điểm hoạt động:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="Rate"
                    defaultValue={x.Rate}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Ngày tạo tài khoản:
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    id="CreateDate"
                    defaultValue={x.CreateDate}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <p className="title-viewdetail">Thông tin cá nhân khách hàng</p>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Ngày sinh: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    id="Birthday"
                    defaultValue={info.Birthday}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Chứng minh nhân dân: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="IndentifyCard"
                    defaultValue={info.IdentityCard}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Địa chỉ hiện nay: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="Address"
                    defaultValue={info.Address}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Mail: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="Email"
                    defaultValue={info.Email}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Số điện thoại: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="NumberPhone"
                    defaultValue={info.NumberPhone}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Số xe: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="CarNumber"
                    defaultValue={info.CarNumber}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Thông tin xe: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="CarInformation"
                    defaultValue={info.CarInformation}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Giấy phép: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="CarLicense"
                    defaultValue={info.CarLicense}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Loại xe: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="CarSpecials"
                    defaultValue={info.CarSpecials}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Ngày đăng ký: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="date"
                    className="form-control"
                    id="DateSignup"
                    defaultValue={info.DateSignup}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Rate: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="RateDriver"
                    defaultValue={info.Rate}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label" />
                <div className="col-sm-10">
                  <button
                    className="btn btn-success"
                    onClick={this.capnhatdriver.bind(this)}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserDetail; // Don’t forget to use export default!
