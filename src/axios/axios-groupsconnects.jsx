import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://groupsconnectsapi.azurewebsites.net'
    baseURL: 'http://localhost:61888'
    
})

export default instance;