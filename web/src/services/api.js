import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3333/'
});

export async function isLogged() {
    const {data} = await api.get('/logged',{withCredentials : true});
    console.log({data});
    return data.authenticated;
}

export async function logout(e) {
e.preventDefault();

const res = await api.get('/logout', { withCredentials: true });

}
    
export default api;
