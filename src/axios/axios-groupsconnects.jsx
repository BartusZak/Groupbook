import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.groupsconnectsapi.hostingasp.pl'
})

export default instance;