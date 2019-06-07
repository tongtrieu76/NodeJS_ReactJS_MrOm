import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Routing from "./RoutingMachine";
import Info from "./info";
import io from 'socket.io-client';

export default class LeafletMap extends Component {
  constructor(props) {

    super(props);
    this.socket = io.connect({reconnect: true});

    this.state = {
      lat: 57.74,
      lng: 11.94,
      zoom: 18,
      isMapInit: false,
      childVisible: false,
      listDrivers: null,
      getadd:null,
      route:null,
    };

    this.socket.on("location_driver_online", (data) => {
      this.setState({
        listDrivers: data
      })
    })

    this.setRoute = this.setRoute.bind(this);
  }
  setRoute(route){
    this.setState({route})
}
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
  addToMarker = (e) => {
  // var toLocation=this.props;
  if(this.state.getadd) this.setState({ getadd: null});;
    // toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    // this.props.setToLocation(toLocation);
    this.setState({ getadd: [{X:e.latlng["lat"],Y:e.latlng["lng"]}]});
  }


  onClick(nowLocation) {
    alert(nowLocation)
  }
  render() {

    const { nowLocation } = this.props;
    // console.log(this.props);
    // console.log(this.state.getadd +"fggfgf55"  );
    // console.log(nowLocation + "fdsdffds")
    const position = nowLocation;
    return (

      <Map center={position} zoom={this.state.zoom} ref={this.saveMap} onClick={this.addToMarker}>
        <TileLayer
          // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {nowLocation && <Marker position={nowLocation}  >

          <Popup>
            Popup for any custom information.
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>

            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>

            <a href="www.google.com"> csdffdfsfsdfdssfdfs</a>
            {/* <button onClick={() => this.onClick(nowLocation)} > dfssdfsfdfsd  </button> */}
          </Popup>
        </Marker>}




        {this.state.listDrivers != null ?
          (this.state.listDrivers).map((data, i) => {
            return (
              <Marker key={i} position={[data.Location_X, data.Location_Y]} >
                <Popup>A pretty CSS3 popup.<br />Easily customizable.<br /> {data.Location_X}, {data.Location_Y} </Popup>
              </Marker>
            )

          })
          : ""

        }


        {this.state.getadd != null ? (this.state.getadd).map((data, i) => {
                            return (
                                <Marker key={i} position={[data.X,data.Y]}>
                                    <Popup>A pretty CSS3 popup.<br />Easily customizable.<br/> {data.X}, {data.Y} </Popup>
                                </Marker>
                            )

                        }) :""}


        {this.state.isMapInit && this.state.getadd != null && <Routing map={this.map} from={nowLocation} to={[this.state.getadd[0].X,this.state.getadd[0].Y]}  route={this.state.route} setRoute={this.setRoute} />}

        {
          this.state.childVisible
            ? <Info />
            : null
        }
      </Map>
    );
  }
}
