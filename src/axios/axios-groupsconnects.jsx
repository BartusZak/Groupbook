import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://www.groupsconnectsapi.hostingasp.pl'
=======
    // baseURL: 'https://groupsconnectsapi.azurewebsites.net'
    baseURL: 'http://localhost:61888'
    
>>>>>>> c1a88a6e4593d4fc7e8fb9727e2e39278cbed1bb
})

export default instance;