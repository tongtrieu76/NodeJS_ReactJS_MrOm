import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Routing from "./RoutingMachine";
import Info from "./info";
import io from "socket.io-client";
import L from "leaflet";
import Modal from "react-modal";
import bike from "../../img/bike.png";
import { setCurrentUser } from "../action/authActions";
import jwt from "jsonwebtoken";
import Control from "react-leaflet-control";
import axios from "axios";

// import gifload from "../../img/loading.gif";

var Icon = L.icon({
  iconUrl: bike,
  iconSize: [60, 70]
});

// var intervalLoad;

var id_Socket;
var arr = [];
var arr1 = [];
var arrXeOm = [];
var min = { id: 0, minlegnt: 99999, Location_X: 0, Location_Y: 0 };
var datadriver = { Name: "", Image: "", CarNumber: "", Time: "", Length: "" };

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    width: "auto",
    overflow: "hidden"
  }
};
var socket = io.connect({ reconnect: true });
export default class LeafletMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 18,
      isMapInit: false,
      childVisible: false,
      listDrivers: null,

      route: null,
      modalIsOpen: false,
      modalIsOpenDriver: false,
      distance: 0,
      time: 0,
      minDriver: null,
      dataNguoiDatXe: null,
      dem: 15,
      xacnhanchuyen: false,
      infonguoidat: "",
      vitritaixe: {lat:"",lng:""}
    };

    socket.on("location_driver_online", data => {
      // this.setState({
      //   listDrivers: null
      // });
      this.setState({
        listDrivers: data
      });
    });

    this.setRoute = this.setRoute.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openModalDriver = this.openModalDriver.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalDriver = this.closeModalDriver.bind(this);
  }

  setRoute(route) {
    this.setState({ route });
  }
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
  addToMarker = e => {
    var { setToLocation, toLocation } = this.props;

    // if (this.state.getadd) this.setState({ getadd: null });;
    // this.setState({ getadd: [{ X: e.latlng["lat"], Y: e.latlng["lng"] }] });

    // var toLocation=this.props;
    if (setToLocation) this.props.setToLocation(null);
    toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    if (setToLocation) this.props.setToLocation(toLocation);
  };

  onClick(location) {
    // alert(location)
    // if (this.state.getadd) this.setState({ getadd: null });
    // this.setState({ getadd: [{X:location[0],Y:location[1]}]});
  }

  closeModalDriver() {
    this.setState({ modalIsOpenDriver: false });
  }

  componentDidMount() {
    Modal.setAppElement("#text1");

    if (!localStorage.jwtToken) {
      socket.emit("sendrole", { id: 0, role: 0 });
      socket.on("sendid", data => {
        id_Socket = data;
      });
    } else if (
      localStorage.jwtToken &&
      0 === setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
    ) {
      var role = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role;
      var id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id;
      socket.emit("sendrole", { id: id, role: role });
      socket.on("sendid", data => {
        id_Socket = data;
      });
      console.log(arrXeOm);

      socket.on(id, data => {
        if (data.Huy === true) {
          // var min1 = 99999999;
          // var min2 = 99999;

          // console.log("arr1 ")
          // console.log(arr1)
          // var vitri = 0;
          // for (var i = 0; i < arr1.length; i++) {
          //   const element = arr1[i].minlegnt;

          //   if (min1 > element) {
          //     min2 = min1;
          //     vitri = i;
          //     min1 = element;
          //   } else if (min1 < element && min2 > element) {
          //     min2 = element;
          //     vitri = i;

          //   }

          // }
          // console.log(id)
          // for (var i = 0; i < arrXeOm.length; i++) {
          //   const element = arrXeOm[i].id;

          //   if (element === min.id) {
          //     arrXeOm.slice(i, 1);
          //   }
          //   console.log(arrXeOm);
          // }

          // var minlaplai = arrXeOm[0].minlegnt;
          // var vitri = 0;
          // for (var j = 0; j < arrXeOm.length; j++) {
          //   const element = arrXeOm[j].minlegnt;
          //   if (minlaplai > element) {
          //     minlaplai = element;
          //     vitri = j;
          //   }
          // }
          // console.log(minlaplai + "   " + vitri + "       sddsfdfdfss");
          // const { nowLocation, toLocation } = this.props;
          // var send = {
          //   userID: id,
          //   taixeID: arrXeOm[vitri].id,
          //   diadiemdon: { x: nowLocation.lat, y: nowLocation.lng },
          //   diadiemden: { x: toLocation.lat, y: toLocation.lng },
          //   id_Socket: id_Socket
          // };

          // socket.emit("datxe", send);
          alert(data.mess);
        }
        else if(data.TuChoi === true)
        {
          alert(data.mess);
        }
        else
        if(data.success === "true")
        {
            alert("Hoàn tất")
            setTimeout(() => {
            window.location.replace('/')},5000);
        }
        if(data.success === "false")
        {
            alert("Tài xế hủy chuyến")
            setTimeout(() => {
            window.location.replace('/')},5000);
        }

        
      });
    } else if (
      localStorage.jwtToken &&
      2 === setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
    ) {
      var role1 = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role;
      var id1 = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id;
      socket.emit("sendrole", { id: id1, role: role1 });
      socket.on("sendid", data => {
        // alert(id1);

        id_Socket = data;
      });
      axios.get(`/api/location/${id1}`).then(({ data: user }) => {
        // vitritaixe.lat = user.Location_X
        // vitritaixe.lng = user.Location_Y
        this.setState({vitritaixe:{lat:user.Location_X,lng:user.Location_Y}})
      });
      socket.on(id1, user => {
     
        if(user.success === "true" )
        {
            alert("Hoàn tất")
            window.location.replace('/')
        }
        else if(user.success === "false")
        {
          window.location.replace('/')
          
        }
        else
        {
          this.setState({ modalIsOpenDriver: true, dataNguoiDatXe: user });

        }
        // intervalLoad = setInterval(() => {
        //   this.setState({ dem: this.state.dem - 1 })
        // }, 1000);

        // setTimeout(() => {
        //   if (this.state.xacnhanchuyen === false) {
        //     this.tuchoichuyen(this);
        //     this.setState({ modalIsOpenDriver: false, dem: 15 })

        //   }

        // }, 15000)
        axios.get(`/api/account/${user.userID}`).then(({ data: user }) => {

          this.setState({ infonguoidat: user.Name })
        });
      });

    }
  }

  tinhkhoangcach() {
    var { nowLocation } = this.props;

    var { listDrivers } = this.state;
    console.log(nowLocation, listDrivers);
    if (nowLocation && listDrivers) {
      arr = this.state.listDrivers;
      arr.forEach(element => {
        const X = element.Location_X;
        const Y = element.Location_Y;

        var nowX = nowLocation.lat;
        var nowY = nowLocation.lng;

        var d = Math.sqrt((nowX - X) * (nowX - X) + (nowY - Y) * (nowY - Y));
        console.log(d);
        if (d < min.minlegnt) {
          min.id = element.AccountID;
          min.minlegnt = d;
          min.Location_X = element.Location_X;
          min.Location_Y = element.Location_Y;
          // console.log(d + "   " + element.AccountID);
        }

        const temp = {
          id: element.AccountID,
          minlegnt: d,
          Location_X: element.Location_X,
          Location_Y: element.Location_Y
        };
        arr1.push(temp);
      });
      console.log(arr1);
      arrXeOm = arr1;

      axios.get(`/api/account/${min.id}`).then(({ data: user }) => {
        // console.log('user', data);
        datadriver.Name = user.Name;
        datadriver.Image = user.Image;
      });

      axios.get(`/api/driver/${min.id}`).then(({ data: user }) => {
        // console.log('user', data);
        datadriver.CarNumber = user.CarNumber;
      });
    }
  }

   openModal() {
    this.tinhkhoangcach();
    this.setState({ modalIsOpen: true, minDriver: min });
  }
  openModalDriver() {
  
    this.setState({ modalIsOpenDriver: true });
  }
 

  closeModal() {
    this.setState({ modalIsOpen: false });
  }


   nhanchuyen(e) {
    
    socket.emit("nhanchuyen", {
     
      diadiemden_X:this.state.dataNguoiDatXe.diadiemden.x,
      diadiemden_Y:this.state.dataNguoiDatXe.diadiemden.y,
      diadiemdon_X:this.state.dataNguoiDatXe.diadiemdon.x,
      diadiemdon_Y:this.state.dataNguoiDatXe.diadiemdon.y,
      taixeID:this.state.dataNguoiDatXe.taixeID,
      userID: this.state.dataNguoiDatXe.userID,
    
      tongtien:this.state.dataNguoiDatXe.total,
      sokm:this.state.dataNguoiDatXe.length,
      sophut:this.state.dataNguoiDatXe.time,
      
    });
    this.setState({ xacnhanchuyen: true, modalIsOpenDriver: false });

  }

   tuchoichuyen(e) {
    this.setState({ modalIsOpenDriver: false});

    socket.emit("tuchoichuyen", {
      diadiemden_X:this.state.dataNguoiDatXe.diadiemden.x,
      diadiemden_Y:this.state.dataNguoiDatXe.diadiemden.y,
      diadiemdon_X:this.state.dataNguoiDatXe.diadiemdon.x,
      diadiemdon_Y:this.state.dataNguoiDatXe.diadiemdon.y,
      taixeID:this.state.dataNguoiDatXe.taixeID,
      userID: this.state.dataNguoiDatXe.userID,
    });
  }

  tuchoichuyenHuy(e){
    this.setState({ modalIsOpenDriver: false});
  }
  ketthucchuyen(e) {
    this.setState({ modalIsOpenDriver: false});

    socket.emit("ketthucchuyen", {
      diadiemden_X:this.state.dataNguoiDatXe.diadiemden.x,
      diadiemden_Y:this.state.dataNguoiDatXe.diadiemden.y,
      diadiemdon_X:this.state.dataNguoiDatXe.diadiemdon.x,
      diadiemdon_Y:this.state.dataNguoiDatXe.diadiemdon.y,
      taixeID:this.state.dataNguoiDatXe.taixeID,
      userID: this.state.dataNguoiDatXe.userID,
    });
  }
  render() {
    // console.log(datadriver);
    // var datadatxe = this.state.dataNguoiDatXe;
    // console.log(datadatxe);
    console.log(this.state);
    // console.log(this.props.toLocation);
    const { nowLocation, toLocation } = this.props;
    const minDriverss = this.state.minDriver;
    var dataNguoiDatXe = this.state.dataNguoiDatXe;
    var ToTal;
    // console.log(minDriverss);
    var infonguoidat = this.state.infonguoidat;
    // var reandermapdriver;
var vitritaixe = this.state.vitritaixe
      
      var xacnhanchuyen = this.state.xacnhanchuyen;
    function timtaixe(e) {
      var id = -1;

      if (localStorage.jwtToken) {
        id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id;
      }
      var send = {
        userID: id,
        taixeID: min.id,
        diadiemdon: { x: nowLocation.lat, y: nowLocation.lng },
        diadiemden: { x: toLocation.lat, y: toLocation.lng },
        id_Socket: id_Socket,
        time: Math.ceil(datadriver.Time / 60).toFixed(0),
        length: Math.ceil(datadriver.Length / 1000).toFixed(0),
        total: ToTal

      };
      console.log(min.id);

      socket.emit("datxe", send);
    }

    function renderinforTaiXe() {
      console.log(minDriverss);

      if (
        minDriverss &&
        minDriverss.id !== 0 &&
        minDriverss.minlegnt !== 99999
      ) {
        if (Math.ceil(datadriver.Length / 1000) <= 5) {
          ToTal = Math.ceil(datadriver.Length / 1000) * 5000;
        } else if (
          Math.ceil(datadriver.Length / 1000) > 5 &&
          Math.ceil(datadriver.Length / 1000) <= 10
        ) {
          ToTal = 5 * 5000 + (Math.ceil(datadriver.Length / 1000) - 5) * 6000;
        } else {
          ToTal =
            5 * 5000 +
            5 * 6000 +
            (Math.ceil(datadriver.Length / 1000) - 11) * 7000;
        }

        return (
          <div>
            <h1 className="text-center">Thông Tin Chuyến </h1>
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  className="imgPreview2"
                  alt=""
                  src={process.env.PUBLIC_URL + datadriver.Image}
                />
              </div>
              <div className="col-md-6 text-wrap">
                <div className="form-group">
                  <label className="font-weight-bold">Tên tài xế:</label> &nbsp;
                  <label>{datadriver.Name}</label>
                  <br />
                  <label className="font-weight-bold">Biển Số Xe:</label> &nbsp;
                  <label>{datadriver.CarNumber}</label>
                  <br />
                  <label className="font-weight-bold">Lộ Trình:</label> &nbsp;
                  <label className="font-weight-bold">
                    {Math.ceil(datadriver.Length / 1000).toFixed(0)} KM
                  </label>
                  <br />
                  <label className="font-weight-bold ">Thời Gian:</label> &nbsp;
                  <label className="font-weight-bold ">
                    {Math.ceil(datadriver.Time / 60).toFixed(0)} Phút
                  </label>
                  <br />
                  <label className="font-weight-bold text-danger">
                    Tổng Tiền:
                  </label>{" "}
                  &nbsp;
                  <label className="font-weight-bold text-danger">
                    {ToTal} Nghìn
                  </label>
                </div>
                {
                  // JSON.stringify(datadriver)
                }
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-dark" onClick={timtaixe.bind(this)}>

                Tìm Tài Xế
              </button>
            </div>
          </div>
        );
      } else {
        return <h1>Không Có Dữ Liệu</h1>;
      }
    }

    console.log(toLocation, nowLocation);
  
    function rendernhanxecuataixe() {
      if (dataNguoiDatXe) {



        return (
          <div>
            <h1> Thông Tin Chuyến </h1>

            <div className="row">
              <div className="col-md-6 text-center">


                {
                  // JSON.stringify(dataNguoiDatXe)
                }
              </div>
              <div className="col-md-6 text-center">
                <div className="form-group">
                  <label className="font-weight-bold">Tên Người Đặt:</label> &nbsp;
              <label>{infonguoidat}</label>
                  <br />

                  <label className="font-weight-bold">Lộ Trình:</label> &nbsp;
              <label className="font-weight-bold">
                    {dataNguoiDatXe.length}    KM
              </label>
                  <br />
                  <label className="font-weight-bold ">Thời Gian:</label> &nbsp;
              <label className="font-weight-bold ">
                    {dataNguoiDatXe.time}    Phút
              </label>
                  <br />
                  <label className="font-weight-bold text-danger">
                    Tổng Tiền:
              </label>
                  &nbsp;
              <label className="font-weight-bold text-danger">
                    {
                      dataNguoiDatXe.total
                    }   Nghìn
              </label>
                </div>

              </div>
            </div>
           

          </div>
        );
      } else {
      }
      return <h1>Không Có Dữ Liệu</h1>;
    }
if( localStorage.jwtToken &&
  2 === setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role)
{
  return (
    <Map
      center={vitritaixe}
      zoom={this.state.zoom}
      ref={this.saveMap}
      onClick={this.addToMarker}
      id="text1"
    >
    {
      // nowLocation && toLocation &&

      <Control position="topleft">
        <button onClick={this.openModalDriver} className="btn btn-default">
         Xem Chi Tiết
        </button>
      </Control>
    }
      <TileLayer
        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />

    
      {vitritaixe && (
        <Marker position={vitritaixe}  icon={Icon}>
          <Popup>
            Popup for any custom information.
            
          </Popup>
        </Marker>
      )}
   


      { this.state.isMapInit && xacnhanchuyen && dataNguoiDatXe && (
        <Routing
        setDisTime={(dis, time) => {
          this.setState({ distance: dis, time: time });
          datadriver.Time = time;
          datadriver.Length = dis;
        }}
          map={this.map}
          from={[dataNguoiDatXe.diadiemdon.x, dataNguoiDatXe.diadiemdon.y]}
          to={[dataNguoiDatXe.diadiemden.x, dataNguoiDatXe.diadiemden.y]}
          route={this.state.route}
          setRoute={this.setRoute}
        />
      )}

      <Modal
        isOpen={this.state.modalIsOpenDriver}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModalDriver}
        style={customStyles}
        contentLabel="Example Modal"
      >
      

        {rendernhanxecuataixe()}
          {dataNguoiDatXe &&
          
            <div className="text-center">

            <button className="btn btn-dark" onClick={this.nhanchuyen.bind(this)}> Xác Nhận </button>
            <button className="btn btn-dark" onClick={this.tuchoichuyenHuy.bind(this)}> Hủy </button>
  
           </div>
  
          
          }
       
      </Modal>

     { xacnhanchuyen && <Modal
      isOpen={this.state.modalIsOpenDriver}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModalDriver}
      style={customStyles}
      contentLabel="Example Modal"
    >
    

      {rendernhanxecuataixe()}
        {dataNguoiDatXe &&
        
          <div className="text-center">

      
          <button className="btn btn-dark" onClick={this.tuchoichuyen.bind(this)}> Hủy </button>
          <button className="btn btn-dark"
           onClick={this.ketthucchuyen.bind(this)}
           > Kết Thúc Chuyến </button>
         </div>

        
        }
     
    </Modal>} 
    </Map>
  );
}
else{
  return (
    <Map
      center={nowLocation ? nowLocation : toLocation}
      zoom={this.state.zoom}
      ref={this.saveMap}
      onClick={this.addToMarker}
      id="text1"
    >
      {
        // nowLocation && toLocation &&

        <Control position="topleft">
          <button onClick={this.openModal} className="btn btn-default">
            Đặt xe
          </button>
        </Control>
      }

      <TileLayer
        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />

      {/* vi tri hien tai */}

      {toLocation && (
        <Marker position={toLocation}>
          <Popup>Popup for any custom information.</Popup>
        </Marker>
      )}
      {nowLocation && (
        <Marker position={nowLocation}>
          <Popup>
            Popup for any custom information.
            <button onClick={this.openModal}> </button>
          </Popup>
        </Marker>
      )}

      {/* { vi tri den }
    {  fromLocation &&<Marker position={fromLocation}>
        <Popup>
          Popup for any custom information.
          <button onClick={() => this.onClick(fromLocation)} > dfssdfsfdfsd  </button>
        </Popup>
       
      </Marker>} */}

      {this.state.listDrivers != null
        ? this.state.listDrivers.map((data, i) => {
          return (
            <Marker
              key={i}
              position={[data.Location_X, data.Location_Y]}
              icon={Icon}
            >
              <Popup>
                A pretty CSS3 popup.
                  <br />
                Easily customizable.
                  <br /> {data.Location_X}, {data.Location_Y}{" "}
              </Popup>
            </Marker>
          );
        })
        : ""}

  




      {this.state.isMapInit && toLocation !== null && nowLocation !== null && (
        <Routing
          setDisTime={(dis, time) => {
            this.setState({ distance: dis, time: time });
            datadriver.Time = time;
            datadriver.Length = dis;
          }}
          map={this.map}
          from={[nowLocation.lat, nowLocation.lng]}
          to={[toLocation.lat, toLocation.lng]}
          route={this.state.route}
          setRoute={this.setRoute}
        />
      )}

      {this.state.childVisible ? <Info /> : null}

      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {renderinforTaiXe()}
      </Modal>

      <Modal
        isOpen={this.state.modalIsOpenDriver}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModalDriver}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <div >{datadatxe ? datadatxe : "dsdsasdasddsadsadsadsa"}</div> */}

        {rendernhanxecuataixe()}
          {dataNguoiDatXe &&
          
            <div className="text-center">

            <button className="btn btn-dark" onClick={this.nhanchuyen.bind(this)}> Xác Nhận </button>
            <button className="btn btn-dark" onClick={this.tuchoichuyen.bind(this)}> Hủy </button>
  
           </div>
  
          
          }
       
      </Modal>
    </Map>
  );
}
  
  }
}
