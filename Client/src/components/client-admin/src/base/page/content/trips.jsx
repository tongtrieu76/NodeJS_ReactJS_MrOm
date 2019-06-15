import React, { Component } from "react";
import Modal from "react-modal";
import "../../public/css/inforAccount.css";
import TripDetails from "./trips/detailTrips";

var arr = [];
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
class trips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      datas: [],
      flag: false,
      modalIsOpen: false,
      details: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount() {
      fetch("http://localhost:4000/api/account/").then(res => res.json()).then(rs =>{
          arr = rs;
      })
  }
  componentDidMount() {
    //user
    fetch("http://localhost:4000/api/trip/all")
      .then(response => response.json())
      .then(result => {
        for (var i = 0; i < result.length; i++) {
        //   result[i].userID = this.formatRowName(result[i].userID);
        //   result[i].taixeID = this.formatRowName(result[i].taixeID);
        }
        console.log(result);
        this.setState({
          isLoaded: true,
          datas: result
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
      Modal.setAppElement("#content-2");
  }
  formatRowName(id) {
    fetch("http://localhost:4000/api/account/" + id)
      .then(res => res.json())
      .then(rs => {
        console.log(id + " - " + rs.UserName + "(" + rs.Name + ")");
        const kq = id + " - " + rs.UserName + "(" + rs.Name + ")";
        return kq;
      });
  }
  xoa(){

  }

  openModal(item) {
    //   item.userID = this.formatRowName(item.userID);
    //   item.taixeID = this.formatRowName(item.taixeID);
    this.setState({ modalIsOpen: true, details: item});
  }
  // -- close modal form chi tiet
  closeModal() {
    this.setState({ modalIsOpen: false});
  }
  render() {
    const { datas } = this.state;
    return (
      <div id="content-2">
        <div>
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
          <TripDetails detail={this.state.details} />
        </Modal>
        </div>
        <div className="col-md-12">
          <p id="title-content">Quản lý thông tin chuyến</p>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa để tìm kiếm..."
            name="search"
          />
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <i className="glyphicon glyphicon-search" />
            </button>
          </div>
        </div>
        <div className="col-md-12" id="content-content">
          <table className="table">
            <thead>
              <tr>
                <th>Id chuyến</th>
                <th>Ngày đi</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item, i) => (
                <tr key={i}>
                  <td>{item._id}</td>
                  <td>{item.date}</td>
                  <td>
                    <button onClick={this.openModal.bind(this,item)} className="btn btn-info" id="btn-edit">
                      Chi tiết
                    </button>
                    {/* <button onClick={this.xoa.bind(this,item)} className="btn btn-warning" id="btn-delete">
                      Xóa
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default trips; // Don’t forget to use export default!
