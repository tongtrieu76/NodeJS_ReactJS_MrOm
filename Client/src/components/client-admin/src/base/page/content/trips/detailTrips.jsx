import React, { Component } from "react";
import "../../../public/css/account/userdetail.css";
import * as dateformat from "dateformat";
import moment from 'moment'
class TripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            infoUser: {},
            infoDr: {},
            error: false, 
            isLoading: false
        }
    }
    componentWillMount(){
        this.setState({details: this.props.details});
    }
    componentDidMount(){
        const x = this.state.details;
        // fetch("http://localhost:4000/api/user/" + x.userID).then(rs => rs.json()).then(result => {
        //     fetch("http://localhost:4000/api/driver/" + x.taixeID).then(rs1 => rs1.json()).then(result1 => {
        //         this.setState({infoUser: result, infoDr: result1});
        //     })
        //     .catch(error => this.setState({ error, isLoading: false }));
        // })
        // .catch(error => this.setState({ error, isLoading: false }));
    }
  render() {
    var x = this.props.detail;
    // x.date = dateformat(new Date(x.date),"isoDate");
    var infoUs = this.state.infoUser;
    var infoDr = this.state.infoDr;
    return (
      <div>
        <div className="col-md-12">
          <form>
            <div id="view-detail">
              <div className="form-group row">
                <p className="title-viewdetail">Thông tin chuyến {x._id}</p>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Mã chuyến: 
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Tên đăng nhập..."
                    defaultValue={x._id}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Khách hàng: 
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập..."
                    defaultValue={x.userID}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Tài xế: 
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập..."
                    defaultValue={x.taixeID}
                  />
                </div>
              </div>
              
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Điểm đón khách: 
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập..."
                    defaultValue={x.diadiemdon_X + " - " + x.diadiemdon_Y}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Điểm đến: 
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên đăng nhập..."
                    defaultValue={x.diadiemden_X + " - " + x.diadiemden_Y}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Ngày đi:
                </label>
                <div className="col-sm-10">
                  <input
                  type="date" data-date-format="YYYY-MM-DD HH:mm:ss"
                    className="form-control"
                    placeholder="Tên đăng nhập..."
                    defaultValue= {moment(x.date).format("YYYY-MM-DD")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Tổng tiền:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue= {x.tongtien}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Số kilomet: 
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue= {x.sokm}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="text" className="col-sm-2 col-form-label">
                  Trạng thái:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue= {x.status}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TripDetails; // Don’t forget to use export default!
