// import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import jwt from 'jsonwebtoken';



export function setCurrentUser(user) {
  return {
    type: "Default",
    user
  };
}

export function logout() {

  console.log("0");
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  setCurrentUser({});
  window.location.replace('/')

}


export function login(data) {

  var Token = jwt.sign({ Token: data.Token, id: data.id, Role: data.Role }, 'TokenIdRole');


  localStorage.setItem('jwtToken', Token);
  setAuthorizationToken(Token);
  setCurrentUser(jwt.decode(Token));
  window.location.replace('/')


}





