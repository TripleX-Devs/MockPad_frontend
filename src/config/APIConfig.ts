import axios from 'axios';
import Cookies from 'js-cookie';


export const API_BASE_URL="http://localhost:3001";

const token=Cookies.get('token');

 const apiClient=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
});

if(token){
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default apiClient;

