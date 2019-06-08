import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

import setAuthorizationToken from './components/action/setAuthorizationToken';
import {setCurrentUser} from './components/action/authActions'
import jwt from 'jsonwebtoken';

import * as serviceWorker from './serviceWorker';


if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
      console.log(setCurrentUser(jwt.decode(localStorage.jwtToken))) 
      
    }


ReactDOM.render(<App />, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
