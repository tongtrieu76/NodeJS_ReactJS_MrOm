import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Routing from "./RoutingMachine";
import Info from "./info";
import io from 'socket.io-client';
import L from "leaflet";
import Modal from 'react-modal';
import bike from "../../img/bike.png"
import { setCurrentUser } from '../action/authActions'
import jwt from 'jsonwebtoken';
import Control from 'react-leaflet-control';

import gifload from "../../img/loading.gif"


var Icon = L.icon({
  iconUrl: bike,
  iconSize: [60, 70],
})


var intervalLoad;
// var dataNguoiDatXe = {userID : "",
//   taixeID : "",
//   diadiemdon_x :  "",
//   diadiemdon_y : "",
//   diadiemden_x :  "",
//   diadiemden_y : ""
// }


var id_Socket;
var arr = [];
var arr1 = [];
var arrXeOm = [];
var min = { id: 0, minlegnt: 99999, Location_X: 0, Location_Y: 0 };

const customStyles = {
  content: {

    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "auto",
    width: "auto",
    overflow: 'hidden',

  }
};
export default class LeafletMap extends Component {
  constructor(props) {

    super(props);
    this.socket = io.connect({ reconnect: true });

    this.state = {

      zoom: 18,
      isMapInit: false,
      childVisible: false,
      listDrivers: null,
      // getadd: null, 
      route: null,
      modalIsOpen: false,
      modalIsOpenDriver: false,

      distance: 0,
      time: 0,
      minDriver: null,

      dataNguoiDatXe: null,
      dem: 15,
      xacnhanchuyen: false,


    };

    this.socket.on("location_driver_online", (data) => {
      this.setState({
        listDrivers: data
      })
    })

    this.setRoute = this.setRoute.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModalDriver = this.closeModalDriver.bind(this);

  }


  tinhkhoangcach() {
    var { nowLocation } = this.props;
    if (nowLocation) {
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

        const temp = { id: element.AccountID, minlegnt: d, Location_X: element.Location_X, Location_Y: element.Location_Y };
        arr1.push(temp);

      });
      console.log(arr1);
      arrXeOm = arr1;

    }



  }





  setRoute(route) {
    this.setState({ route })
  }
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
  addToMarker = (e) => {

    var { setToLocation, toLocation } = this.props;

    // if (this.state.getadd) this.setState({ getadd: null });;
    // this.setState({ getadd: [{ X: e.latlng["lat"], Y: e.latlng["lng"] }] });

    // var toLocation=this.props;
    if (setToLocation) this.props.setToLocation(null);
    toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    if (setToLocation) this.props.setToLocation(toLocation);

  }

  onClick(location) {
    // alert(location)
    // if (this.state.getadd) this.setState({ getadd: null });
    // this.setState({ getadd: [{X:location[0],Y:location[1]}]});

  }


  async openModal() {
    await this.tinhkhoangcach();
    console.log(min);
    var distance = 0;
    var { nowLocation } = this.props;
    //    if(nowLocation)
    //    {
    //    var nowX = nowLocation.lat;
    //    var nowY = nowLocation.lng;
    //    console.log('nhayzo')
    //    let leafletElement = L.Routing.control({    
    //     waypoints: [  
    //     L.latLng(nowX,nowY),
    //     L.latLng(min.Location_X,min.Location_Y)],

    //   }).addTo(this.map.leafletElement).on('routesfound', function (e) {
    //    distance = e.routes[0].summary.totalDistance;
    //     // min = e.routes[0].summary.totalTime;

    //   console.log(distance)

    //   });
    //   leafletElement.getPlan()
    //   this.state.route.remove(this.map);



    // }


    this.setState({ modalIsOpen: true, minDriver: min });

  }




  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  closeModalDriver() {
    this.setState({ modalIsOpenDriver: false });


  }

  componentDidMount() {

    Modal.setAppElement("#text1")



    if (!localStorage.jwtToken) {


      this.socket.emit("sendrole", { id: 0, role: 0 })
      this.socket.on("sendid", (data) => {
        id_Socket = data
        // alert(data);
      })
    }
    else if (localStorage.jwtToken && 0 === setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role) {
      // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
      var role = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
      var id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id
      this.socket.emit("sendrole", { id: id, role: role })
      this.socket.on("sendid", (data) => {
        id_Socket = data
        // alert(data);

      })
      console.log(arrXeOm)

      this.socket.on(id, (data) => {
        // id_Socket = data
        // alert(data);

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
          for (var i = 0; i < arrXeOm.length; i++) {
            const element = arrXeOm[i].id;
            // console.log();
            if (element === min.id) {
              arrXeOm.slice(i, 1);

            }
            console.log(arrXeOm);
          }

          //  alert(JSON.stringify(arrXeOm))
          var minlaplai = arrXeOm[0].minlegnt;
          var vitri = 0;
          for (var j = 0; j < arrXeOm.length; j++) {
            const element = arrXeOm[j].minlegnt;
            if (minlaplai > element) {
              minlaplai = element;
              vitri = j;
            }

          }
          console.log(minlaplai + "   " + vitri + "       sddsfdfdfss")

          // Location_X: "10.7304458"
          // Location_Y: "106.6106881"
          // id: "5cf0111d1c4b6c34fc277c1f"
          // minlegnt: 0.06846057672126504
          const { nowLocation, toLocation } = this.props;
          var send = {
            userID: id,
            taixeID: arrXeOm[vitri].id,
            diadiemdon: { x: nowLocation.lat, y: nowLocation.lng },
            diadiemden: { x: toLocation.lat, y: toLocation.lng },
            id_Socket: id_Socket,
          };

          this.socket.emit("datxe", send)
        }



      })

    }
    else if (localStorage.jwtToken && 2 === setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role) {

      var role1 = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
      var id1 = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id
      this.socket.emit("sendrole", { id: id1, role: role1 })
      this.socket.on("sendid", (data) => {
        alert(id1 + "111");

        id_Socket = data
        // alert(data);

      })

      this.socket.on(id1, (data) => {
        //  dataNguoiDatXe = {userID : data.userID,
        //  taixeID : data.taixeID,
        //  diadiemdon_x : data.diadiemdon.x,
        //  diadiemdon_y : data.diadiemdon.y,
        //  diadiemden_x : data.diadiemden.x,
        //  diadiemden_y : data.diadiemden.y}
        //  console.log(data)
        this.setState({ modalIsOpenDriver: true, dataNguoiDatXe: data });
        intervalLoad = setInterval(() => {
          this.setState({ dem: this.state.dem - 1 })
        }, 1000);

        setTimeout(() => {
          if (this.state.xacnhanchuyen === false) {
            this.tuchoichuyen(this);
            this.setState({ modalIsOpenDriver: false, dem: 15 })

          }


        }, 15000)
      })

    }


  }


  timtaixe(e) {
    // alert("sdasdasdasdadsa");
    var id;
    const { nowLocation, toLocation } = this.props;

    if (localStorage.jwtToken) {
      // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
      id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id

    } else {
      id = -1;
    }

    var send = {
      userID: id,
      taixeID: min.id,
      diadiemdon: { x: nowLocation.lat, y: nowLocation.lng },
      diadiemden: { x: toLocation.lat, y: toLocation.lng },
      id_Socket: id_Socket,
    };
    console.log(min.id);

    // this.socket = io.connect("http://localhost:3000/",{ reconnect: true, xyz:"abc" });

    this.socket.emit("datxe", send)



    // this.socket.on(id , (data) => {

    // })

  }

  nhanchuyen(e) {

    this.socket.emit("nhanchuyen", { id: this.state.dataNguoiDatXe.idkhach, mess: "nhận" });
    this.setState({ xacnhanchuyen: true })

  }

  tuchoichuyen(e) {
    this.setState({ modalIsOpenDriver: false, dem: 15 })

    this.socket.emit("tuchoichuyen", { id: this.state.dataNguoiDatXe.idkhach, mess: "Hủy rồi", Huy: true });
  }
  render() {
    var datadatxe = this.state.dataNguoiDatXe;
    console.log(datadatxe)
    // console.log(this.props.toLocation);
    const { nowLocation, toLocation } = this.props;


    // console.log(this.props);
    // console.log(this.state.getadd +"fggfgf55"  );
    // console.log(nowLocation + "fdsdffds")
    // const position = nowLocation;

    console.log(toLocation, nowLocation);

    const minDriverss = this.state.minDriver;
    return (

      <Map center={nowLocation ? nowLocation : toLocation} zoom={this.state.zoom} ref={this.saveMap} onClick={this.addToMarker} id="text1">

    { nowLocation && toLocation &&   <Control position="topleft" >
          <button
            onClick={this.openModal}
            className="btn btn-default"
          >
            Đặt xe
          </button>
        </Control>}
        <TileLayer
          // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {/* vi tri hien tai */}

        {toLocation && <Marker position={toLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>}
        {nowLocation && <Marker position={nowLocation}  >

          <Popup>
            Popup for any custom information.

            <button onClick={this.openModal}>   </button>

          </Popup>
        </Marker>}


        {/* { vi tri den }
      {  fromLocation &&<Marker position={fromLocation}>
          <Popup>
            Popup for any custom information.
            <button onClick={() => this.onClick(fromLocation)} > dfssdfsfdfsd  </button>
          </Popup>
         
        </Marker>} */}



        {this.state.listDrivers != null ?
          (this.state.listDrivers).map((data, i) => {
            return (
              <Marker key={i} position={[data.Location_X, data.Location_Y]} icon={Icon} >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.<br /> {data.Location_X}, {data.Location_Y} </Popup>
              </Marker>
            )

          })
          : ""

        }


        {/* {this.state.getadd != null ? (this.state.getadd).map((data, i) => {
          return (
            <Marker key={i} position={[data.X, data.Y]}    >
              <Popup>A pretty CSS3 popup.<br />Easily customizable.<br /> {data.X}, {data.Y} </Popup>
            </Marker>
          )

        }) : ""} */}


        {this.state.isMapInit && toLocation !== null && nowLocation !== null && <Routing setDisTime={(dis, time) => this.setState({ distance: dis, time: time })} map={this.map} from={[nowLocation.lat, nowLocation.lng]} to={[toLocation.lat, toLocation.lng]} route={this.state.route} setRoute={this.setRoute} />}

        {
          this.state.childVisible
            ? <Info />
            : null
        }

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >


          {minDriverss ? minDriverss.id : ""


          }
          {minDriverss ? minDriverss.minlegnt : ""


          }

          <button onClick={this.timtaixe.bind(this)}>   Tìm Tài Xế </button>
        </Modal>


        <Modal
          isOpen={this.state.modalIsOpenDriver}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModalDriver}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* <div >{datadatxe ? datadatxe : "dsdsasdasddsadsadsadsa"}</div> */}


          <button onClick={this.nhanchuyen.bind(this)}>  Xác Nhận </button>
          <button onClick={this.tuchoichuyen.bind(this)}>  Hủy </button>
          <center>
            <h1> {this.state.dem}</h1>
            <img src={gifload} alt="Load" />
          </center>

        </Modal>
      </Map>
    );
  }
}
