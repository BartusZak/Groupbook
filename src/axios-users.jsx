import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-groupsconnects.firebaseio.com/'
})

export default instance;