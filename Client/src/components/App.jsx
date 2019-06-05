import React from 'react';

import { Component } from 'react';
import Header from './Header';
import Maps from './Maps';

class App extends Component {

  render() {
    // console.log(this.state.greeting)

    return (
      <div className="App">
      
          <div className="full">
            <Header />
          </div>
     
          <Maps/>
        
      </div>

    );
  }
}
export default App;


