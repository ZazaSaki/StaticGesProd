import axios from 'axios';

const api = axios.create({
    baseURL : 'https://withoutlogin.herokuapp.com/'
});

export default api;
