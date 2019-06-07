import React from 'react';

import { Component } from 'react';
import Header from './Header';
import Maps from './Maps';
import LeafletMap from "./map/LeafletMap";
class App extends Component {

  render() {
    // console.log(this.state.greeting)

    return (
      <div >
      
          {/* <div className="full">
            <Header />
          </div>
          <div className="full">
          <Maps/>
          </div> */}
          <LeafletMap />
        
      </div>

    );
  }
}
export default App;


