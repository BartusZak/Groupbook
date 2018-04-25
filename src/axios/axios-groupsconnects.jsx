import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.groupsconnectsapi.hostingasp.pl'

    //zapasowy API - bartuszak (azure)
    //baseURL: 'https://groupsconnectsapibartuszak.azurewebsites.net/'

    //główny API - artur (azure)
    //baseURL: 'https://groupsconnectsapi.azurewebsites.net'
    
})

export default instance;