import React from "react";
import LeafletMap from "./components/map/LeafletMap";
import Header from './components/Header';
import io from 'socket.io-client';
import { setCurrentUser } from './components/action/authActions'
import jwt from 'jsonwebtoken';
import { logout } from './components/action/authActions'

import axios from 'axios';


var vitrihientai= null;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io.connect();
    this.state = {

      data_pos: null,
      nowLocation: null,
      toLocation: null,
      L_X: null,
      L_Y: null,
      nowL_X: null,
      nowL_Y: null,
      km: null,
    };
    this.setToLocation = this.setToLocation.bind(this);
    this.setNowLocation = this.setNowLocation.bind(this);

    // this.socket.on("location_driver_online", (data) => {
    //     this.setState({
    //         data_pos: data
    //     })
    // })
  }

  componentWillMount() {

    if (localStorage.jwtToken) {
      // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
      var id = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.id;
      var Token = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.token;

      var Role = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role;
      var User = {
        AccountID: id,
        Token: Token,
        Role: Role
      }
      // console.log(User)
      axios.post('/api/login/checktoken', User)

        .then(res => {
          // login(res.data) 
          console.log("Đúng")
        })

        .catch(err => {
          console.log(err.response)
          // logout();

        })

      // console.log(role);

    }


  }
  setToLocation(Location) {
    var toLocation = this.state.toLocation;
    if (toLocation) {

      this.setState({ toLocation: null });

    }
    else {
      this.setState({ toLocation: Location });

    }
  }


  setNowLocation(Location) {
    var nowLocation = this.state.nowLocation;
    if (nowLocation) {

      this.setState({ nowLocation: null });

    }
    else {
      this.setState({ nowLocation: Location });

    }
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleClick(e) {

    // this.setState({
    //   toLocation: [this.state.L_X, this.state.L_Y]
    // });

  }
  componentDidMount() {
    navigator.geolocation.watchPosition((pos) => {
      vitrihientai = { lat:pos.coords.latitude, lng:pos.coords.longitude};
      // this.setNowLocation({ lat:pos.coords.latitude, lng:pos.coords.longitude})
     // this.setState({ nowLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude } })
     // setTimeout(() => this.setState({ nowLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude } }), 0)
     // this.setState({
     //   nowLocation: {lat:pos.coords.latitude, lng:pos.coords.longitude},
     //   // toLocation: {lat:pos.coords.latitude, lng:pos.coords.longitude},
     // });
   });
  }

  render() {
    // console.log("123")
// console.log(this.state)
    return (
      <div>
        <div className="full">
          <Header />
        </div>
        <div className="full">


          <div className="headerleaflet">

            <div className="form-group" id="book_xe">


              <div className="input-group mt-2">
                <label >Điểm đón </label>
                <label className="ml-3 mr-3" >Tọa độ x: </label>
                <input type="text" className="form-control mr-3" id="nowL_X" required placeholder="X.." onChange={this.handleChange} />
                <label className="ml-3 mr-3" >Tọa độ Y: </label>
                <input type="text" className="form-control mr-3" id="nowL_Y" required placeholder="Y.." onChange={this.handleChange} />


                <div className="input-group-prepend mr-3  ">
                  <button className="input-group-text" id="btn-timxe" onClick={() => {
                    this.setNowLocation({
                      lat: this.state.nowL_X, lng: this.state.nowL_Y
                    });

                    setTimeout(() => this.setState({ nowLocation: { lat: this.state.nowL_X, lng: this.state.nowL_Y } }), 0)
                  }}>Xác Định</button>
                </div>
              </div>




              <div className="input-group mt-2">
                <label >Điểm đến </label>
                <label className="ml-3 mr-3" >Tọa độ x: </label>
                <input type="text" className="form-control mr-3" id="L_X" required placeholder="X.." onChange={this.handleChange} />
                <label className="ml-3 mr-3" >Tọa độ Y: </label>
                <input type="text" className="form-control mr-3" id="L_Y" required placeholder="Y.." onChange={this.handleChange} />


                <div className="input-group-prepend mr-3  ">
                  <button className="input-group-text" id="btn-timxe" onClick={() => {
                    this.setToLocation({
                      lat: this.state.L_X, lng: this.state.L_Y
                    });

                    setTimeout(() => this.setState({ toLocation: { lat: this.state.L_X, lng: this.state.L_Y } }), 0)
                  }}>Xác Định</button>
                </div>
              </div>

            </div>
            <div className="text-center">
              <button type="button" className="btn btn-info" id="get_my_location" onClick={ () => {
                // navigator.geolocation.watchPosition((pos) => {
                //    this.setNowLocation({ lat:pos.coords.latitude, lng:pos.coords.longitude})
                //   // this.setState({ nowLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude } })
                //   // setTimeout(() => this.setState({ nowLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude } }), 0)
                //   // this.setState({
                //   //   nowLocation: {lat:pos.coords.latitude, lng:pos.coords.longitude},
                //   //   // toLocation: {lat:pos.coords.latitude, lng:pos.coords.longitude},
                //   // });
                // });
                this.setNowLocation(vitrihientai);
                this.setState({nowLocation:vitrihientai});


              }}>
                Vị trí của tôi
                                  </button>


            </div>
            <div className="text-center">
              <label > </label>
            </div>
          </div>


          <LeafletMap nowLocation={this.state.nowLocation} toLocation={this.state.toLocation} setToLocation={this.setToLocation} />


        </div>


      </div>
    );
  }
}
 //  "proxy": "http://localhost:5000",