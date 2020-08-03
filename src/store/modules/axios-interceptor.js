import axios from 'axios';

const token = localStorage.setItem('access_token', access_token);

axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };

export default axios;