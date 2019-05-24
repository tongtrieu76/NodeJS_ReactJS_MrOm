import React from 'react';
// import leaflet from '../js/leaflet.js';
import L from 'leaflet';
import IMG from '../img/location.png';

export default class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            lng: null,
            lat: null

        };
    }
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
          },
          error => console.log(error)
        );
      }
    componentDidMount() {
        
     
        this.mymap = new L.map("mapid", {
            center: [10.73773, 106.67904],
            zoom: 50,
            zoomControl: false


        });

        L.tileLayer(
            "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",

            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: "mapbox.satellite", //streets,satellite
                accessToken:
                    "pk.eyJ1IjoiY2hpZXVjaGlldSIsImEiOiJjanZhazdpaWUwa3puM3lubTY1MGJ0azhkIn0.X4Q45YxQ2HUGCjXBDCkahQ",
                zoom: 16,
                minZoom: 10,
                maxZoom: 18,
                maxNativeZoom: 20,
                zoomAnimation: true
            }
        ).addTo(this.mymap);



    }
   
    handleClick() {
        var icon_book = L.icon({
            iconUrl: IMG,
            iconSize: [40, 50]
        })


        var maket = L.marker([this.state.lat, this.state.lng], { icon: icon_book }).addTo(this.mymap);
        maket.bindPopup("<b>Bạn đang ở đây.</b>").openPopup();

    }
    render() {
        return (

            <div className="maps">
                <div className="container-fluid" >

                    <div className="row">
                        <div className="col-sm-12" id="menu">
                            <div className="form-group" id="book_xe">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Điểm đón..." />
                                    <input type="text" className="form-control" placeholder="Điểm đến..." />
                                    <div className="input-group-prepend">
                                        <button className="input-group-text" id="btn-timxe">Tìm xe</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12" id="slidebar_content">
                            <div>
                                <button type="button" className="btn btn-info" id="get_my_location" onClick={(e) => this.handleClick(e)}>
                                    Vị trí của tôi
                </button>
                            </div>
                            <div id="mapid">

                            </div>


                        </div>
                    </div>
                </div>

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