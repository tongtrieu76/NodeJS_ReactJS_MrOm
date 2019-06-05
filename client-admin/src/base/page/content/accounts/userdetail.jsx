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
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        if(this.props.detail.Status === "Hoạt động"){
            document.getElementById("radio-active").checked = "True";
        } else if(this.props.detail.Status === "Khóa"){
            document.getElementById("radio-lock").checked = "True";
        } else if(this.props.detail.Status === "Chưa kích hoạt"){
            document.getElementById("radio-unactive").checked = "True";
        } else {
            document.getElementById("radio-lock").checked = "True";
        }

        //có đang hoạt động
        if(this.props.detail.StatusConnect === 1){
            document.getElementById("statusconnect").value = "Có";
        } else if(this.props.detail.StatusConnect === 0){
            document.getElementById("statusconnect").value = "Không";
        } else {
            document.getElementById("statusconnect").value = "sdsadsadsad";
        }

        //lý do khóa
        if(this.props.detail.WhyLock === "null"){
            document.getElementById("lydokhoa").value = "Tài khoản hiện đang hoạt động!";
        } else {
            document.getElementById("lydokhoa").value = "Tsadsdsadadg!";
        }

        //
        fetch("http://localhost:4000/api/user/" + String(this.props.detail._id))
        .then(response => response.json())
        .then(result => {
            result.Birthday = dateformat(new Date(result.Birthday),"isoDate");
            // console.log(result);
            this.setState({info: result});
        })
        .catch(error => this.setState({ error, isLoading: false }));
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
                <p className="title-viewdetail">Thông tin cá nhân khách hàng</p>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Tên đăng nhập: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
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
                    id="inputPassword"
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
                    id="matruycap"
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
                    id="lydokhoa"
                    placeholder="Lý do khóa"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Có đang hoạt động:
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="statusconnect" disabled/>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Điểm hoạt động:
                </label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="diemhoatdong" defaultValue={x.Rate} disabled/>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Ngày tạo tài khoản:
                </label>
                <div className="col-sm-10">
                <input type="date" className="form-control" id="create" defaultValue={x.CreateDate} disabled/>
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
                  <input type="date" className="form-control" id="birthday" defaultValue={info.Birthday} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Chứng minh nhân dân: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="cmnd" defaultValue={info.IdentityCard} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Địa chỉ hiện nay: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="diachi" defaultValue={info.Address} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Mail: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="mail" defaultValue={info.Email} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Số điện thoại: <span className="span-must">(*)</span>
                </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="sdt" defaultValue={info.NumberPhone} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label" />
                <div className="col-sm-10">
                  <button className="btn btn-success">Cập nhật</button>
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
