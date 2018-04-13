import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://groupsconnectsapi.azurewebsites.net'
})

export default instance;