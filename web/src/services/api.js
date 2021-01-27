import axios from 'axios';

const api = axios.create({
    baseURL : 'https://static-ges-backend.herokuapp.com/'
});

export async function isLogged() {
    const {data} = await api.get('/logged',{withCredentials : true});
    console.log({data});
    return data.authenticated;
}
    
export default api;
