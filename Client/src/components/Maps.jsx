import React from 'react';
// import leaflet from '../js/leaflet.js';
import L from 'leaflet';
import IMG from '../img/location.png';
import io from 'socket.io-client';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.js';

import "leaflet-routing-machine"
import axios from 'axios';

var icon_book = L.icon({
    iconUrl: IMG,
    iconSize: [40, 50]
})


export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io.connect();
        this.state = {

            L_X: 10.0000,
            L_Y: 10.2222,
            data_pos: null,
        };
        this.socket.on("location_driver_online", (data) => {
            this.setState({
                data_pos: data
            })
        })
    }
    send_pos() {

        var x;
        var y;
        //    console.log(document.getElementById('L_X').value);
        if (document.getElementById('L_X').value === "" && document.getElementById('L_Y').value === "") {
            x = 0;
            y = 0;

        }
        else {
            if (document.getElementById('L_X').value === "") {
                x = 0;
                y = document.getElementById('L_Y').value;

            }
            if (document.getElementById('L_Y').value === "") {
                x = document.getElementById('L_X').value;
                y = 0;


            }

        }


        if (document.getElementById('L_X').value !== "" && document.getElementById('L_Y').value !== "") {
            x = document.getElementById('L_X').value;

            y = document.getElementById('L_Y').value;


        }
        var data = [x, y];
        this.socket.emit("client_send", data);
        // var maket = L.marker([this.state.lat, this.state.lng], { icon: icon_book }).addTo(this.mymap);
        // maket.bindPopup("<b>Bạn đang ở đây.</b>").openPopup();
    }
    // componentWillMount() {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             this.setState({ L_X: position.coords.latitude, L_Y: position.coords.longitude });
    //         },
    //         error => console.log(error)
    //     );
    // }
//  componentDidMount(){
//     this.map = L.map('map123');

//     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);
        
//         L.Routing.control({
//             waypoints: [
//                 L.latLng(57.74, 11.94),
//                 L.latLng(57.6792, 11.949)
//             ],
//             routeWhileDragging: true
//         }).addTo(this.map);
//  }
    // componentDidMount() {
    //     axios.get('/api/location', {  timeout: 1000})
    //       .then(response => {
    //         if (response.status === 200 && response != null) {
    //           this.setState({
    //             data_pos: response.data
    //           });
    //         } else {
    //           console.log('problem');
    //         } 
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    handleClick() {
        // var maket = L.marker([this.state.lat, this.state.lng], { icon: icon_book }).addTo(this.mymap);
        // maket.bindPopup("<b>Bạn đang ở đây.</b>").openPopup();
        var data = [this.state.L_X, this.state.L_Y];
        this.socket.emit("client_send", data);

    }
    render() {
        const Local = [this.state.L_X, this.state.L_Y];
        //  const Local1 = this.state.lat + "," +this.state.lat;
        console.log(this.state.data_pos)
        return (

            <div className="full slidebar_content">

                <div className="form-group" id="book_xe">
                    <div className="input-group mt-5">
                        <input type="text" className="form-control" id="L_X" required placeholder="X.." />

                        <input type="text" className="form-control" id="L_Y" required placeholder="Y.." />


                        <div className="input-group-prepend">
                            <button className="input-group-text" id="btn-timxe" onClick={() => this.send_pos()}>Xác Định</button>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-info" id="get_my_location" onClick={(e) => this.handleClick(e)}>
                        Vị trí của tôi
                                </button>
                    {/* <input type="text" className="form-control" placeholder="X.." value={Local}/> */}

                </div>
                <div className="text-center"> <label > {Local}</label></div>


                <Map className="mapid" center={Local} zoom={10}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {this.state.data_pos != null ?
                        (this.state.data_pos).map((data, i) => {
                            return (
                                <Marker key={i} position={[data.Location_X,data.Location_Y]} icon={icon_book}>
                                    <Popup>A pretty CSS3 popup.<br />Easily customizable.<br/> {data.Location_X}, {data.Location_Y} </Popup>
                                </Marker>
                            )

                        })
                        : ""

                    }
                    {/* <Routing from={[57.74, 11.94]} to={[57.6792, 11.949]} map={this.refs.map}/> */}
                </Map>

{/* <div id="map123"> </div> */}
            </div>
        );
    }
}




// import React, { Component } from 'react'
// import Leaflet from 'leaflet';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';

// Leaflet.Icon.Default.imagePath =
// '../node_modules/leaflet'

// delete Leaflet.Icon.Default.prototype._getIconUrl;

// Leaflet.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });



// export default class MapDisplay extends Component {
// state = {
//     lat:10.789658,
//     lng: 106.6468263,
//     zoom: 10,


// }


// render() {
//     const position = [this.state.lat, this.state.lng]
//     return (
//     <Map center={position} zoom={this.state.zoom} style={{height : '100vh'}}>
//         <TileLayer
//         attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//         <Popup>
//             Son Konum
//         </Popup>
//         </Marker>
//     </Map>
//     )
// }
// }