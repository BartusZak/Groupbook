import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://groupsconnectsapi.azurewebsites.net'
})

export default instance;