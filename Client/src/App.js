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
        fromLocation:null,
    };
  
    // this.socket.on("location_driver_online", (data) => {
    //     this.setState({
    //         data_pos: data
    //     })
    // })
}
// handleClick() {
//   navigator.geolocation.watchPosition((pos)=>{
//         this.setState({
//           nowLocation:[pos.coords.latitude,pos.coords.longitude],
//          });
//     });
// }
componentDidMount() {
  navigator.geolocation.watchPosition((pos)=>{
    this.setState({
      nowLocation:[pos.coords.latitude,pos.coords.longitude],
      fromLocation:[pos.coords.latitude,pos.coords.longitude]
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
                <input type="text" className="form-control mr-3" id="L_X" required placeholder="X.." />
                <label className="ml-3 mr-3" >Tọa độ Y: </label>
                <input type="text" className="form-control mr-3" id="L_Y" required placeholder="Y.." />


                <div className="input-group-prepend mr-3  ">
                  <button className="input-group-text" id="btn-timxe" >Xác Định</button>
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


          <LeafletMap  nowLocation={this.state.nowLocation} />


        </div>


      </div>
    );
  }
}
 //  "proxy": "http://localhost:5000",