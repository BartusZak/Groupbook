import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-groupsconnects.firebaseio.com/'
    //baseURL: 'http://groupsconnectsapi.azurewebsites.net/api/users/'
})

export default instance;