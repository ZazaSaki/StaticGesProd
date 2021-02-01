import axios from 'axios';

const api = axios.create({
    baseURL : 'https://static-ges-backend.herokuapp.com/'
});

export default api;
