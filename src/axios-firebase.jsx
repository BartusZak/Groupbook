import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://groupbook-6e7d3.firebaseio.com'
})

export default instance;

