import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://strapi.kameas.ru/',
});

export default instance;
