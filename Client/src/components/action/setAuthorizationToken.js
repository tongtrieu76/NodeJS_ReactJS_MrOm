
import axios from 'axios';

export default function setAutho(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Beare ${token}`;
        // console.log(  axios.defaults.headers.common['Authorization'])
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
