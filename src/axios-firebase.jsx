import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://groupbook-91dd2.firebaseio.com'
})

export default instance;




