import axios from 'axios';
import './notifications';
import Vue from 'vue';

const instance = axios.create({
    baseURL: 'https://strapi.kameas.ru/',
});

instance.interceptors.response.use((response) => response, (error) => {
    Vue.notify({
        group: 'auth',
        type: 'error',
        title: 'ERROR',
        text: 'Please provide valid email address!',
    });
    Promise.reject(error);
});

export default instance;
