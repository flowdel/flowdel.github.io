import axios from 'axios';
import './plugins/notifications';
import Vue from 'vue';

const instance = axios.create({
    baseURL: 'https://strapi.kameas.ru/',
});

instance.interceptors.response.use((response) => response, (error) => {
    // eslint-disable-next-line no-restricted-syntax

    console.log(JSON.stringify(error));

    if (error.message.messages) {
        error.message.messages.forEach((message) => {
            Vue.notify({
                group: 'auth',
                type: 'error',
                title: 'ERROR',
                text: message,
            });
        });
    }

    Promise.reject(error);
});

export default instance;
