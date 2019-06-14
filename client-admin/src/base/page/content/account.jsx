import React, { Component } from "react";
import Modal from "react-modal";
import UserDetail from "./accounts/userdetail.jsx";
import DriverDetail from "./accounts/driverdetails.jsx";
import * as dateformat from "dateformat";
import loading from "../../public/gif/loading2.gif";

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
const styleloading = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    width: "auto",
    backgroundColor: "rgb(255, 255, 255)",
    overflow: "hidden"
  }
};
var intervalLoading;
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
      OpenLoading: false,
      details: {},
      dem: 9
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
    this.loadData("");

    //select id để show modal
    Modal.setAppElement("#open_modal_1");
  }
  // end

  //search 
  search(){
    const text = document.getElementById("tb-search").value;
    this.loadData(text);
  }




  //Load Data
  loadData(key){
    var url = "";
    if(key == ""){
      url= "http://localhost:4000/api/account/";
    } else {
      url = "http://localhost:4000/api/account/" + key;
    }
    fetch(url)
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
        clearInterval(intervalLoading);
        this.setState({
          isLoaded: true,
          OpenLoading: false,
          datas: result,
          datas_user: arr_user,
          datas_driver: arr_driver,
          dem: 9
        });
        this.ham();
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }





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
    this.resetinput_tx(this);
    this.resetinput(this);
  }
  // end

  //open form loading...
  openloading() {
    this.setState({ OpenLoading: true });
    intervalLoading = setInterval(() => {
      this.setState({ dem: this.state.dem - 1 });
    }, 1000);
    setTimeout(() => {
      if (this.state.OpenLoading === true) {
        alert("Có sự cố xảy ra, vui lòng thử lại!");
        clearInterval(intervalLoading);
        this.setState({ OpenLoading: false, dem: 9 });
      }
    }, 10000);
  }
  //end

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
      var x = window.confirm(
        "Bạn có chắc chắn muốn xóa tài khoản " + item.UserName + " này!"
      );
      if (x) {
        const url = "http://localhost:4000/api/account/deleteacc";
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
            alert(
              "Đã xảy ra lỗi trong quá trình cập nhật! \nVui lòng thử lại!"
            );
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
    const url = "http://localhost:4000/api/account/setstatus";
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
      const url = "http://localhost:4000/api/account/changepassword";
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

  // -- event thêm người dùng
  // -- -- user
  themnguoidung() {
    var publicflag = 0;

    //tên đăng nhập
    var UserName = document.getElementById("UserName");
    if (this.checkinputtext(UserName.value) !== true) {
      UserName.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      UserName.style.backgroundColor = "black";
      UserName.style.color = "#fff";
      publicflag++;
    }

    //mật khẩu
    var Password = document.getElementById("Password");
    if (this.checkinputtext(Password.value) !== true) {
      Password.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Password.style.backgroundColor = "black";
      Password.style.color = "#fff";
      publicflag++;
    }

    //mật khẩu again
    var PasswordAgain = document.getElementById("PasswordAgain");
    if (this.checkinputtext(PasswordAgain.value) !== true) {
      PasswordAgain.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      PasswordAgain.style.backgroundColor = "black";
      PasswordAgain.style.color = "#fff";
      publicflag++;
    }

    //tên chủ tài khoản
    var Name = document.getElementById("Name");
    if (this.checkinputtext(Name.value) !== true) {
      Name.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Name.style.backgroundColor = "black";
      Name.style.color = "#fff";
      publicflag++;
    }

    //số điện thoại
    var NumberPhone = document.getElementById("NumberPhone");
    if (this.checkinputtext(NumberPhone.value) !== true) {
      NumberPhone.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      NumberPhone.style.backgroundColor = "black";
      NumberPhone.style.color = "#fff";
      publicflag++;
    }

    //địa chỉ
    var Address = document.getElementById("Address");
    if (this.checkinputtext(Address.value) !== true) {
      Address.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Address.style.backgroundColor = "black";
      Address.style.color = "#fff";
      publicflag++;
    }

    //email
    var Email = document.getElementById("Email");
    var flag = 0;
    var arr = Email.value.split("");
    arr.forEach(item => {
      if (item === "@") {
        flag++;
      }
    });
    if (flag === 0) {
      Email.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Email.style.backgroundColor = "black";
      Email.style.color = "#fff";
      // alert("Email có vẻ sai, vui xem lại trường email!");
      publicflag++;
    }

    //chứng minh nhân dân
    var IdentityCard = document.getElementById("IdentityCard");
    // if(this.checkinputtext(IdentityCard.value) !== true){
    //   IdentityCard.placeholder = ("Trường này không được để trống hoặc spam khoảng trắng!");
    //   IdentityCard.style.backgroundColor = "black";
    // }

    //sinh nhật
    var Birthday = document.getElementById("Birthday");
    // if(this.checkinputtext(Birthday.value) !== true){
    //   Birthday.placeholder = ("Trường này không được để trống hoặc spam khoảng trắng!");
    //   Birthday.style.backgroundColor = "black";
    // }

    //trạng thái
    var Status = document.querySelector('input[name="optradio"]:checked');

    //check pass and passagain
    if (this.checkinputtext(PasswordAgain.value) === true) {
      if (Password.value !== PasswordAgain.value) {
        alert("Hai mật khẩu phải trùng nhau!");
        PasswordAgain.style.backgroundColor = "black";
        PasswordAgain.style.color = "#fff";
        Password.style.backgroundColor = "black";
        Password.style.color = "#fff";
        publicflag++;
      } else {
        Password.style.backgroundColor = "#fff";
        Password.style.color = "black";
        PasswordAgain.style.backgroundColor = "#fff";
        PasswordAgain.style.color = "black";
      }
    }

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
      const url = "http://localhost:4000/api/user/add";

      this.openloading(this);
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
        .then(res => {
          if (status === 200 && res === "success") {
            setTimeout(() => {
              console.log(status + " : " + res);
              alert("Thêm người dùng thành công!");
              this.resetinput(this);
              this.componentDidMount(this);
            }, 3000);
          } else if (status === 400 && res === "Email tồn tại") {
            console.log(status + " : " + res);
            alert("Email tồn tại, vui lòng dùng email khác!");
          } else if (status === 400 && res === "UserName tồn tại") {  
            console.log(status + " : " + res);
            alert("Tên đăng nhập tồn tại, vui lòng dùng tên đăng nhập khác!");
          } else {
            console(status + " : " + res);
            alert("Đã xảy ra lỗi bất ngờ, vui lòng thử lại!");
          }
        })
        .catch(error => console.error("Error:", error));
    } else {
      //bla bla
    }
  }
  //driver
  themnguoidung_tx() {
    var publicflag = 0;

    //tên đăng nhập
    var UserName = document.getElementById("UserName_tx");
    if (this.checkinputtext(UserName.value) !== true) {
      UserName.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      UserName.style.backgroundColor = "black";
      UserName.style.color = "#fff";
      publicflag++;
    }

    //mật khẩu
    var Password = document.getElementById("Password_tx");
    if (this.checkinputtext(Password.value) !== true) {
      Password.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Password.style.backgroundColor = "black";
      Password.style.color = "#fff";
      publicflag++;
    }

    //mật khẩu again
    var PasswordAgain = document.getElementById("PasswordAgain_tx");
    if (this.checkinputtext(PasswordAgain.value) !== true) {
      PasswordAgain.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      PasswordAgain.style.backgroundColor = "black";
      PasswordAgain.style.color = "#fff";
      publicflag++;
    }

    //tên chủ tài khoản
    var Name = document.getElementById("Name_tx");
    if (this.checkinputtext(Name.value) !== true) {
      Name.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Name.style.backgroundColor = "black";
      Name.style.color = "#fff";
      publicflag++;
    }

    //số điện thoại
    var NumberPhone = document.getElementById("NumberPhone_tx");
    if (this.checkinputtext(NumberPhone.value) !== true) {
      NumberPhone.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      NumberPhone.style.backgroundColor = "black";
      NumberPhone.style.color = "#fff";
      publicflag++;
    }

    //địa chỉ
    var Address = document.getElementById("Address_tx");
    if (this.checkinputtext(Address.value) !== true) {
      Address.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Address.style.backgroundColor = "black";
      Address.style.color = "#fff";
      publicflag++;
    }

    //Carr Number
    var CarNumber = document.getElementById("CarNumber_tx");
    if (this.checkinputtext(CarNumber.value) !== true) {
      CarNumber.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
        CarNumber.style.backgroundColor = "black";
        CarNumber.style.color = "#fff";
      publicflag++;
    }

    //Car Information
    var CarInformation = document.getElementById("CarInformation_tx");
    if (this.checkinputtext(CarInformation.value) !== true) {
      CarInformation.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
        CarInformation.style.backgroundColor = "black";
        CarInformation.style.color = "#fff";
      publicflag++;
    }

    //CarLicense
    var CarLicense = document.getElementById("CarLicense_tx");
    if (this.checkinputtext(CarLicense.value) !== true) {
      CarLicense.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
        CarLicense.style.backgroundColor = "black";
        CarLicense.style.color = "#fff";
      publicflag++;
    }

    //CarSpecials
    var CarSpecials = document.getElementById("CarSpecials_tx");
    if (this.checkinputtext(CarSpecials.value) !== true) {
      CarSpecials.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
        CarSpecials.style.backgroundColor = "black";
        CarSpecials.style.color = "#fff";
      publicflag++;
    }

    //CreateDate
    var CreateDate = document.getElementById("CreateDate_tx");
    if (this.checkinputtext(CreateDate.value) !== true) {
      CreateDate.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
        CreateDate.style.backgroundColor = "black";
        CreateDate.style.color = "#fff";
      publicflag++;
    }

    //Rate
    var Rate = document.getElementById("Rate_tx");
    if (this.checkinputtext(Rate.value) !== true) {
      Rate.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
        Rate.style.backgroundColor = "black";
        Rate.style.color = "#fff";
      publicflag++;
    }


    //email
    var Email = document.getElementById("Email_tx");
    var flag = 0;
    var arr = Email.value.split("");
    arr.forEach(item => {
      if (item === "@") {
        flag++;
      }
    });
    if (flag === 0) {
      Email.placeholder =
        "Trường này không được để trống hoặc spam khoảng trắng!";
      Email.style.backgroundColor = "black";
      Email.style.color = "#fff";
      // alert("Email có vẻ sai, vui xem lại trường email!");
      publicflag++;
    }

    //chứng minh nhân dân
    var IdentityCard = document.getElementById("IdentityCard_tx");
    // if(this.checkinputtext(IdentityCard.value) !== true){
    //   IdentityCard.placeholder = ("Trường này không được để trống hoặc spam khoảng trắng!");
    //   IdentityCard.style.backgroundColor = "black";
    // }

    //sinh nhật
    var Birthday = document.getElementById("Birthday_tx");
    // if(this.checkinputtext(Birthday.value) !== true){
    //   Birthday.placeholder = ("Trường này không được để trống hoặc spam khoảng trắng!");
    //   Birthday.style.backgroundColor = "black";
    // }

    //trạng thái
    var Status = document.querySelector('input[name="optradio"]:checked');

    //check pass and passagain
    if (this.checkinputtext(PasswordAgain.value) === true) {
      if (Password.value !== PasswordAgain.value) {
        alert("Hai mật khẩu phải trùng nhau!");
        PasswordAgain.style.backgroundColor = "black";
        PasswordAgain.style.color = "#fff";
        Password.style.backgroundColor = "black";
        Password.style.color = "#fff";
        publicflag++;
      } else {
        Password.style.backgroundColor = "#fff";
        Password.style.color = "black";
        PasswordAgain.style.backgroundColor = "#fff";
        PasswordAgain.style.color = "black";
      }
    }

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
        Status: Status.value,
        CarNumber: CarNumber.value,
        CarInformation: CarInformation.value,
        CarLicense: CarLicense.value,
        CarSpecials: CarSpecials.value,
        CreateDate: CreateDate.value,
        Rate: Rate.value,
      };
      const url = "http://localhost:4000/api/driver/add";

      this.openloading(this);
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
        .then(res => {
          if (status === 200 && res === "success") {
            setTimeout(() => {
              console.log(status + " : " + res);
              alert("Thêm người dùng thành công!");
              this.resetinput_tx(this);
              this.componentDidMount(this);
            }, 3000);
          } else if (status === 400 && res === "Email tồn tại") {
            console.log(status + " : " + res);
            alert("Email tồn tại, vui lòng dùng email khác!");
          } else if (status === 400 && res === "UserName tồn tại") {
            console.log(status + " : " + res);
            alert("Tên đăng nhập tồn tại, vui lòng dùng tên đăng nhập khác!");
          } else {
            console(status + " : " + res);
            alert("Đã xảy ra lỗi bất ngờ, vui lòng thử lại!");
          }
        })
        .catch(error => console.error("Error:", error));
    } else {
      //bla bla
    }
  }
  //end

  //check input
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
  //end

  //event change backgroundcolor input khi check space,null when submit them nguoi dung
  // -- user
  changeinput_name() {
    document.getElementById("Name").style.backgroundColor = "#fff";
    document.getElementById("Name").style.color = "black";
  }
  changeinput_username() {
    document.getElementById("UserName").style.backgroundColor = "#fff";
    document.getElementById("UserName").style.color = "black";
  }
  changeinput_password() {
    var pass = document.getElementById("Password");
    var again = document.getElementById("PasswordAgain");
    const key = pass.value;
    const keyagain = again.value;
    if (keyagain !== key) {
      again.style.backgroundColor = "black";
      again.style.color = "#fff";
    } else {
      again.style.backgroundColor = "#fff";
      again.style.color = "black";
    }
    document.getElementById("Password").style.backgroundColor = "#fff";
    document.getElementById("Password").style.color = "black";
  }
  changeinput_passwordagain() {
    var pass = document.getElementById("Password");
    var again = document.getElementById("PasswordAgain");
    const key = pass.value;
    const keyagain = again.value;
    if (keyagain !== key) {
      again.style.backgroundColor = "black";
      again.style.color = "#fff";
    } else {
      again.style.backgroundColor = "#fff";
      again.style.color = "black";
    }
  }
  changeinput_numberphone() {
    document.getElementById("NumberPhone").style.backgroundColor = "#fff";
    document.getElementById("NumberPhone").style.color = "black";
  }
  changeinput_address() {
    document.getElementById("Address").style.backgroundColor = "#fff";
    document.getElementById("Address").style.color = "black";
  }
  changeinput_email() {
    var x = document.getElementById("Email");
    if (x.value === "") {
      x.style.backgroundColor = "#fff";
      x.style.color = "black";
    } else {
      var flag = 0;
      const arr = x.value.split("");
      arr.forEach(item => {
        if (item === "@") {
          flag++;
        }
      });
      if (flag === 1) {
        x.style.backgroundColor = "#fff";
        x.style.color = "black";
      } else {
        x.style.backgroundColor = "black";
        x.style.color = "#fff";
      }
    }
  }
  changeinput_identitycard() {
    document.getElementById("IdentityCard").style.backgroundColor = "#fff";
    document.getElementById("IdentityCard").style.color = "black";
  }
  changeinput_birthday() {
    document.getElementById("Birthday").style.backgroundColor = "#fff";
    document.getElementById("Birthday").style.color = "black";
  }
  //driver
  changeinput_name_tx() {
    document.getElementById("Name_tx").style.backgroundColor = "#fff";
    document.getElementById("Name_tx").style.color = "black";
  }
  changeinput_username_tx() {
    document.getElementById("UserName_tx").style.backgroundColor = "#fff";
    document.getElementById("UserName_tx").style.color = "black";
  }
  changeinput_password_tx() {
    var pass = document.getElementById("Password_tx");
    var again = document.getElementById("PasswordAgain_tx");
    const key = pass.value;
    const keyagain = again.value;
    if (keyagain !== key) {
      again.style.backgroundColor = "black";
      again.style.color = "#fff";
    } else {
      again.style.backgroundColor = "#fff";
      again.style.color = "black";
    }
    document.getElementById("Password_tx").style.backgroundColor = "#fff";
    document.getElementById("Password_tx").style.color = "black";
  }
  changeinput_passwordagain_tx() {
    var pass = document.getElementById("Password_tx");
    var again = document.getElementById("PasswordAgain_tx");
    const key = pass.value;
    const keyagain = again.value;
    if (keyagain !== key) {
      again.style.backgroundColor = "black";
      again.style.color = "#fff";
    } else {
      again.style.backgroundColor = "#fff";
      again.style.color = "black";
    }
  }
  changeinput_numberphone_tx() {
    document.getElementById("NumberPhone_tx").style.backgroundColor = "#fff";
    document.getElementById("NumberPhone_tx").style.color = "black";
  }
  changeinput_address_tx() {
    document.getElementById("Address_tx").style.backgroundColor = "#fff";
    document.getElementById("Address_tx").style.color = "black";
  }
  changeinput_email_tx() {
    var x = document.getElementById("Email_tx");
    if (x.value === "") {
      x.style.backgroundColor = "#fff";
      x.style.color = "black";
    } else {
      var flag = 0;
      const arr = x.value.split("");
      arr.forEach(item => {
        if (item === "@") {
          flag++;
        }
      });
      if (flag === 1) {
        x.style.backgroundColor = "#fff";
        x.style.color = "black";
      } else {
        x.style.backgroundColor = "black";
        x.style.color = "#fff";
      }
    }
  }
  changeinput_identitycard_tx() {
    document.getElementById("IdentityCard_tx").style.backgroundColor = "#fff";
    document.getElementById("IdentityCard_tx").style.color = "black";
  }
  changeinput_birthday_tx() {
    document.getElementById("Birthday_tx").style.backgroundColor = "#fff";
    document.getElementById("Birthday_tx").style.color = "black";
  }
  changeinput_carnumber_tx() {
    document.getElementById("CarNumber_tx").style.backgroundColor = "#fff";
    document.getElementById("CarNumber_tx").style.color = "black";
  }
  changeinput_carinformation_tx() {
    document.getElementById("CarInformation_tx").style.backgroundColor = "#fff";
    document.getElementById("CarInformation_tx").style.color = "black";
  }
  changeinput_carlicense_tx() {
    document.getElementById("CarLicense_tx").style.backgroundColor = "#fff";
    document.getElementById("CarLicense_tx").style.color = "black";
  }
  changeinput_carspecials_tx() {
    document.getElementById("CarSpecials_tx").style.backgroundColor = "#fff";
    document.getElementById("CarSpecials_tx").style.color = "black";
  }
  changeinput_datecreate_tx() {
    document.getElementById("CreateDate_tx").style.backgroundColor = "#fff";
    document.getElementById("CreateDate_tx").style.color = "black";
  }
  changeinput_rate_tx() {
    document.getElementById("Rate_tx").style.backgroundColor = "#fff";
    document.getElementById("Rate_tx").style.color = "black";
  }
  //end


  // clear input when submit add user success
  resetinput() {
    document.getElementById("Name").value = "";
    document.getElementById("UserName").value = "";
    document.getElementById("Password").value = "";
    document.getElementById("PasswordAgain").value = "";
    document.getElementById("NumberPhone").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("IdentityCard").value = "";
    document.getElementById("Birthday").value = "";
    this.changeinput_name(this);
    this.changeinput_username(this);
    this.changeinput_password(this);
    this.changeinput_passwordagain(this);
    this.changeinput_numberphone(this);
    this.changeinput_address(this);
    this.changeinput_email(this);
    this.changeinput_identitycard(this);
    this.changeinput_birthday(this);
  }
  resetinput_tx() {
    document.getElementById("Name_tx").value = "";
    document.getElementById("UserName_tx").value = "";
    document.getElementById("Password_tx").value = "";
    document.getElementById("PasswordAgain_tx").value = "";
    document.getElementById("NumberPhone_tx").value = "";
    document.getElementById("Address_tx").value = "";
    document.getElementById("Email_tx").value = "";
    document.getElementById("IdentityCard_tx").value = "";
    document.getElementById("Birthday_tx").value = "";
    document.getElementById("CarNumber_tx").value = "";
    document.getElementById("CarInformation_tx").value = "";
    document.getElementById("CarLicense_tx").value = "";
    document.getElementById("CarSpecials_tx").value = "";
    document.getElementById("CreateDate_tx").value = "";
    this.changeinput_name_tx(this);
    this.changeinput_username_tx(this);
    this.changeinput_password_tx(this);
    this.changeinput_passwordagain_tx(this);
    this.changeinput_numberphone_tx(this);
    this.changeinput_address_tx(this);
    this.changeinput_email_tx(this);
    this.changeinput_identitycard_tx(this);
    this.changeinput_birthday_tx(this);
    this.changeinput_carnumber_tx(this);
    this.changeinput_carinformation_tx(this);
    this.changeinput_carlicense_tx(this);
    this.changeinput_carspecials_tx(this);
    this.changeinput_datecreate_tx(this);
  }

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
        <button onClick={this.openloading.bind(this)}>Openloading</button>
        <div id="open_modal_1" />
        {/* modal */}
        <Modal
          isOpen={this.state.OpenLoading}
          onRequestClose={this.closeModal}
          style={styleloading}
        >
          {/* <button
            type="button"
            onClick={this.closeModal}
            id="btn-close"
            className="btn btn-light"
          >
            <span aria-hidden="true">&times;</span>
          </button> */}
          <div>
            <p>Đang xử lý vui lòng chờ trong giây lát...</p>
            <center>
              <h1>{this.state.dem}</h1>
            </center>
            <center>
              <img src={loading} alt={"Loading..."} />
            </center>
          </div>
        </Modal>
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
            type="button"
            onClick={this.closeModal}
            id="btn-close"
            className="btn btn-light"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <DriverDetail detail={this.state.details} />
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
                  placeholder="Nhập tên đăng nhập (VD: khachhangthanthiet)"
                  id="UserName"
                  onChange={this.changeinput_username.bind(this)}
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
                  placeholder="Nhập mật khẩu (VD: mromvuive<3)"
                  id="Password"
                  onChange={this.changeinput_password.bind(this)}
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
                  placeholder="Nhập lại mật khẩu - vui lòng nhập đúng mật khẩu nhập trước đó (VD: mromvuive<3)"
                  id="PasswordAgain"
                  onChange={this.changeinput_passwordagain.bind(this)}
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
                  placeholder="Nhập tên chủ tài khoản (VD: mromdeptrai)"
                  id="Name"
                  onChange={this.changeinput_name.bind(this)}
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
                  placeholder="Nhập số điện thoại (VD: 0333333333)"
                  id="NumberPhone"
                  onChange={this.changeinput_numberphone.bind(this)}
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
                  placeholder="Nhập địa chỉ (VD: 227 Nguyễn Văn Cừ P.4 Q.5 TPHCM)"
                  id="Address"
                  onChange={this.changeinput_address.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Email: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="email"
                  className="form-control col-md-10"
                  placeholder="Nhập email (VD: noname@gmail.com)"
                  id="Email"
                  onChange={this.changeinput_email.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Số CMND:</label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập chứng minh nhân dân (VD: 212456987)"
                  id="IdentityCard"
                  onChange={this.changeinput_identitycard.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Ngày sinh:</label>
              </center>
              <div className="col-md-10">
                <input
                  type="date"
                  className="form-control col-md-10"
                  max="9999-12-31"
                  id="Birthday"
                  onChange={this.changeinput_birthday.bind(this)}
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
                  <input
                    type="radio"
                    name="optradio"
                    value="active"
                    defaultChecked
                  />
                  Kích hoạt
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio" value="unactive" />
                  Vô hiệu hóa
                </label>
              </div>
              <div className="form-group">
                <div className="col-md-2" />
                <div className="col-md-10">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.themnguoidung.bind(this)}
                  >
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
                <label className="col-md-2 label-add">
                  Tên đăng nhập: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập tên đăng nhập (VD: khachhangthanthiet)"
                  id="UserName_tx"
                  onChange={this.changeinput_username_tx.bind(this)}
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
                  placeholder="Nhập mật khẩu (VD: mromvuive<3)"
                  id="Password_tx"
                  onChange={this.changeinput_password_tx.bind(this)}
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
                  placeholder="Nhập lại mật khẩu - vui lòng nhập đúng mật khẩu nhập trước đó (VD: mromvuive<3)"
                  id="PasswordAgain_tx"
                  onChange={this.changeinput_passwordagain_tx.bind(this)}
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
                  placeholder="Nhập tên chủ tài khoản (VD: mromdeptrai)"
                  id="Name_tx"
                  onChange={this.changeinput_name_tx.bind(this)}
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
                  placeholder="Nhập số điện thoại (VD: 0333333333)"
                  id="NumberPhone_tx"
                  onChange={this.changeinput_numberphone_tx.bind(this)}
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
                  placeholder="Nhập địa chỉ (VD: 227 Nguyễn Văn Cừ P.4 Q.5 TPHCM)"
                  id="Address_tx"
                  onChange={this.changeinput_address_tx.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">
                  Email: <span className="span-must">(*)</span>
                </label>
              </center>
              <div className="col-md-10">
                <input
                  type="email"
                  className="form-control col-md-10"
                  placeholder="Nhập email (VD: noname@gmail.com)"
                  id="Email_tx"
                  onChange={this.changeinput_email_tx.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Số CMND:</label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  placeholder="Nhập chứng minh nhân dân (VD: 212456987)"
                  id="IdentityCard_tx"
                  onChange={this.changeinput_identitycard_tx.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Ngày sinh:</label>
              </center>
              <div className="col-md-10">
                <input
                  type="date"
                  className="form-control col-md-10"
                  max="9999-12-31"
                  id="Birthday_tx"
                  onChange={this.changeinput_birthday_tx.bind(this)}
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Biển số xe: <span className="span-must">(*)</span></label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  onChange={this.changeinput_carnumber_tx.bind(this)}
                  id="CarNumber_tx"
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Thông tin xe: <span className="span-must">(*)</span></label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  onChange={this.changeinput_carinformation_tx.bind(this)}
                  id="CarInformation_tx"
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Giấy phép lái xe: <span className="span-must">(*)</span></label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  onChange={this.changeinput_carlicense_tx.bind(this)}
                  id="CarLicense_tx"
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Loại xe: <span className="span-must">(*)</span></label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  onChange={this.changeinput_carspecials_tx.bind(this)}
                  id="CarSpecials_tx"
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Ngày đăng ký: <span className="span-must">(*)</span></label>
              </center>
              <div className="col-md-10">
                <input
                  type="date"
                  className="form-control col-md-10"
                  onChange={this.changeinput_datecreate_tx.bind(this)}
                  id="CreateDate_tx"
                />
              </div>
            </div>
            <div className="form-group">
              <center>
                <label className="col-md-2 label-add">Uy tín: </label>
              </center>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control col-md-10"
                  onChange={this.changeinput_rate_tx.bind(this)}
                  id="Rate_tx"
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
                  <input
                    type="radio"
                    name="optradio"
                    value="active"
                    defaultChecked
                  />
                  Kích hoạt
                </label>
                <label className="radio-inline">
                  <input type="radio" name="optradio" value="unactive" />
                  Vô hiệu hóa
                </label>
              </div>
              <div className="form-group">
                <div className="col-md-2" />
                <div className="col-md-10">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.themnguoidung_tx.bind(this)}
                  >
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
            placeholder="Nhập từ khóa để tìm kiếm Tên đăng nhập hoặc tên người dùng..."
            id="tb-search"
            name="search"
          />
          <div className="input-group-btn">
            <button onClick={this.search.bind(this)}
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
