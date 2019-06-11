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


var Icon = L.icon({
  iconUrl: bike,
  iconSize: [60, 70],
})
var id_Socket;
var arr = [];
var arr1 = [];
var min = { id: 0, minlegnt: 99999, Location_X: 0, Location_Y: 0 };

const customStyles = {
  content: {

    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "50%",
    width: "50%"

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
      distance: 0,
      time: 0,
      minDriver: null,
    };

    this.socket.on("location_driver_online", (data) => {
      this.setState({
        listDrivers: data
      })
    })

    this.setRoute = this.setRoute.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
          console.log(d + "   " + element.AccountID);

        }

        const temp = { id: element.AccountID, minlegnt: d, Location_X: element.Location_X, Location_Y: element.Location_Y };
        arr1.push(temp);

      });
      console.log(arr1);
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
    alert(location)
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


  componentDidMount() {

    Modal.setAppElement("#text1")
    

   
    if (!localStorage.jwtToken) {
      // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
    //  role = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
    //  id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id

      this.socket.emit("sendrole", {id:0,role:0})
      this.socket.on("sendid", (data)=>{
        id_Socket = data

      })
    }

   
  }


  timtaixe(e) {
    alert("sdasdasdasdadsa");
    var id;
    const { nowLocation,toLocation } = this.props;

    if (localStorage.jwtToken) {
      // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
      id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id

    }else{
      id=-1;
    }

    var send = {userID:id,taixeID: min.id, diadiemdon:{x:nowLocation.lat,y:nowLocation.lng},diadiemdem:{x:toLocation.lat,y:toLocation.lng}};
    console.log(id);

  // this.socket = io.connect("http://localhost:3000/",{ reconnect: true, xyz:"abc" });

    this.socket.emit("5cfb2957e07bf838680f06c0",send)


    // this.socket.on(id , (data) => {
     
    // })

  }
  render() {
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
        <div className="leaflet-top leaflet-left ml-5"><div className="leaflet-control-zoom leaflet-bar leaflet-control">
          <button onClick={this.openModal}  > Đặt xe</button>
        </div></div>

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
      </Map>
    );
  }
}
