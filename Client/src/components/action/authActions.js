// import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';
import jwt from 'jsonwebtoken';



export function setCurrentUser(user) {
  return {
    user
  };
}

export async function logout() {

 await window.location.replace('/')
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  setCurrentUser({});
 

}


export function login(data) {

  var Token = jwt.sign({ id: data.id, token: data.token, Role: data.Role }, 'TokenIdRole');


  localStorage.setItem('jwtToken', Token);
  setAuthorizationToken(Token);
  setCurrentUser(jwt.decode(Token));
  window.location.replace('/')


}





