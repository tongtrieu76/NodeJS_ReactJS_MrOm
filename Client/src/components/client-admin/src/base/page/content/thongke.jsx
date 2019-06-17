import React, { Component } from "react";
import "../../public/css/inforAccount.css";
class thongke extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      error: null,
      isLoaded: false,
      datas: [],
      datas_user: [],
      datas_driver: [],
      flag: false
    };
    this.ham = this.ham.bind(this);
  }
  componentDidMount() {
    //user
    fetch("http://localhost:4000/api/user")
      .then(response => response.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          datas_user: result
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));

      //driver
      fetch("http://localhost:4000/api/driver")
      .then(response => response.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          datas_driver: result
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  ham() {
     var x = document.getElementById("select-filter").value;
     if(x === "user"){
       this.setState({datas: this.datas_user});
     } else if(x === "driver"){
      this.setState({datas: this.datas_driver});
     } else {
       this.setState({datas: []});
       return null;
     }
    this.setState({flag: true});
  }
  render() {
    return (
      <div id="content-2">
        <div className="col-md-12">
          <p id="title-content">Thống kê</p>
        </div>
        <div className="col-md-12">
          <select
            className="btn btn-warning dropdown-toggle btn-filter"
            onChange={this.ham} id="select-filter"
          >
            <option value="user">Người dùng</option>
            <option value="driver">Tài xế</option>
          </select>
        </div>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Nhập từ khóa để tìm kiếm..." name="search"/>
          <div className="input-group-btn">
            <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
          </div>
        </div>
        <div className="col-md-12" id="content-content">
          <table className="table">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Name</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* {datas.map((item,i) => (
              <tr key={i}>
                <td>{item.UserName}</td>
                <td>{item.Name}</td>
                <td>
                  <button className="btn btn-warning" id="btn-edit">Sửa</button>
                  <button className="btn btn-warning" id="btn-delete">Xóa</button>
                </td>
              </tr>
            ))} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default thongke; // Don’t forget to use export default!
