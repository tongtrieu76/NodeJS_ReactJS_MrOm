import React from 'react';
import img from '../img/ohm.png';
import { setCurrentUser } from './action/authActions'
import jwt from 'jsonwebtoken';

import logo from '../img/mrom.png';

import Error404 from './404/Error404';


export default class Home extends React.Component {
    render() {

        var role;

        if (localStorage.jwtToken) {
          // console.log( setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role);
          role = setCurrentUser(jwt.decode(localStorage.jwtToken)).user.Role
    
        }else{
          role=-1;
        }
    if(role !== 1)
    {
        return( <Error404> </Error404>)

    }
    else{
        return (

            <main className="bd-masthead mt-5 mb-5" id="content" role="main">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6 mx-auto col-md-6 order-md-2">
                            <img src={img} className="logo" alt="logo" />
                        </div>
                        <div className="col-md-6 order-md-1 text-md-left pr-md-5">
                            <img src={logo} className="App-logo" alt="logo" />

                            <div className="text-wrap" >
                                <h1 className="text-white">
                                    ADmin

                                        </h1>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        );
    }

      
    }
}