import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Routing from "./RoutingMachine";
import Info from "./info";
import io from 'socket.io-client';
import L from "leaflet";

import bike from "../../img/bike.png"

var Icon = L.icon({
  iconUrl: bike,
  iconSize: [60, 70],
})
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
    };

    // this.socket.on("location_driver_online", (data) => {
    //   this.setState({
    //     listDrivers: data
    //   })
    // })

    this.setRoute = this.setRoute.bind(this);
    

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
    
    var { setToLocation ,toLocation } = this.props;

    // if (this.state.getadd) this.setState({ getadd: null });;
    // this.setState({ getadd: [{ X: e.latlng["lat"], Y: e.latlng["lng"] }] });

    // var toLocation=this.props;
    if(setToLocation) this.props.setToLocation(null);
    toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    if(setToLocation)  this.props.setToLocation(toLocation);

  }
 
  onClick(location) {
    alert(location)
    // if (this.state.getadd) this.setState({ getadd: null });
    // this.setState({ getadd: [{X:location[0],Y:location[1]}]});

  }
  render() {
    // console.log(this.props.toLocation);

    const { nowLocation,toLocation } = this.props;
    // console.log(this.props);
    // console.log(this.state.getadd +"fggfgf55"  );
    // console.log(nowLocation + "fdsdffds")
    // const position = nowLocation;

    console.log(toLocation);

    
    return (

      <Map center={nowLocation} zoom={this.state.zoom} ref={this.saveMap} onClick={this.addToMarker}>
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

            <button onClick={() => this.onClick(nowLocation)} > dfssdfsfdfsd  </button>
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


        {this.state.isMapInit && toLocation != null && <Routing map={this.map} from={nowLocation} to={[toLocation.lat,toLocation.lng]} route={this.state.route} setRoute={this.setRoute} />}

        {
          this.state.childVisible
            ? <Info />
            : null
        }
      </Map>
    );
  }
}
