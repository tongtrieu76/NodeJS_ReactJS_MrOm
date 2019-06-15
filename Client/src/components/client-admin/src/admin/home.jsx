import React, { Component } from 'react';
import Header from '../base/page/header.jsx';
import Content from '../base/page/content.jsx';
import Footer from '../base/page/footer.jsx';

import '../base/public/css/home.css';
class Admin extends Component {
  render() {
    return(
      <div>
      
        <div className="col-md-12" id="f2">
        <div className="row">
        <Content />
        </div>
      
        </div>
        
      </div>
    )
  }
}

export default Admin; // Don’t forget to use export default!