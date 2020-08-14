import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://strapi.kameas.ru/',
});

export default instance;
