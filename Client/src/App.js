import React from "react";
import LeafletMap from "./components/map/LeafletMap";
import Header from './components/Header';
import io from 'socket.io-client';

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
    };
    this.setToLocation = this.setToLocation.bind(this);
    // this.socket.on("location_driver_online", (data) => {
    //     this.setState({
    //         data_pos: data
    //     })
    // })
  }
  setToLocation(Location) {
    var toLocation= this.state.toLocation;
    if(toLocation) {

    this.setState({toLocation:null});

    }
   else 
   {
    this.setState({ toLocation:Location });

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
      this.setState({
        nowLocation: [pos.coords.latitude, pos.coords.longitude],
      toLocation: [pos.coords.latitude, pos.coords.longitude],
      });
    });
  }

  render() {
    return (
      <div>
        <div className="full">
          <Header />
        </div>
        <div className="full">


          <div className="headerleaflet">
            <div className="form-group" id="book_xe">


              <div className="input-group mt-4">
                <label className="ml-3 mr-3" >Tọa độ x: </label>
                <input type="text" className="form-control mr-3" id="L_X" required placeholder="X.." onChange={this.handleChange} />
                <label className="ml-3 mr-3" >Tọa độ Y: </label>
                <input type="text" className="form-control mr-3" id="L_Y" required placeholder="Y.." onChange={this.handleChange} />


                <div className="input-group-prepend mr-3  ">
                  <button className="input-group-text" id="btn-timxe" onClick={()=>{
  this.setToLocation({
      lat:this.state.L_X, lng:this.state.L_Y
       });
 
       setTimeout(()=>this.setToLocation({lat:this.state.L_X, lng:this.state.L_Y}),0)
                  }}>Xác Định</button>
                </div>
              </div>
            </div>
            {/* <div className="text-center">
                <button type="button" className="btn btn-info" id="get_my_location"     onClick={(e) => this.handleClick(e)}>
                  Vị trí của tôi
                                  </button>
                <input type="text" className="form-control" placeholder="X.." value={Local}/>

              </div> */}
            <div className="text-center">
              <label > </label>
            </div>
          </div>


          <LeafletMap nowLocation={this.state.nowLocation} toLocation={this.state.toLocation}  setToLocation={this.setToLocation} />


        </div>


      </div>
    );
  }
}
 //  "proxy": "http://localhost:5000",