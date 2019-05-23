import React from 'react';

import { Component } from 'react';
import Header from './Header';
import Maps from './Maps';

import axios from 'axios';
import Autho from './app/setAutho';
// const getData = () =>
//   axios.get('http://localhost:4000')
//     .then((res) => res.data);
if(localStorage.jwtToken)
{
  Autho(localStorage.jwtToken);
  
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      greeting: []
    };
  }
  //  componentWillMount() {
  //    if(this.state.greeting === null)
  //    {
  //     console.log(getData());
  //      getData().then((res)=>{
  //        this.setState({
  //          greeting:res

  //        });

  //      })

  //     }
  //  }
  componentDidMount() {
    axios.get('/api')
      .then(response => {
        if (response.status === 200 && response != null) {
          this.setState({
            greeting: response.data
          });
        } else {
          console.log('problem');
        } 
      })
      .catch(error => {
        console.log(error);
      });
  }

  prindata = () => {

    if (this.state.greeting !== null) {
      return this.state.greeting.map((value, index) => {
        return (
          <h1 className='text-white' key={index} >
            {value.name}
            {value.image}
            {value.ingredients}
          </h1>)
      })
    }
  }
  render() {
    console.log(this.state.greeting)

    return (
      <div className="App">
        <div className="content">
          <div className="header">
            <Header />
          </div>
          {/* <div className="main"></div> */}
          {this.prindata()}
          <Maps/>
        </div>
      </div>

    );
  }
}
export default App;


