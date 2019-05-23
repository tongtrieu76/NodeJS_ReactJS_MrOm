
import axios from 'axios';

export default function setAutho(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Beare ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
