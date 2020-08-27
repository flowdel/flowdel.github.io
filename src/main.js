import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App.vue';
import store from './store/store';
import router from './router';

// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css';

import vuetify from './plugins/vuetify';
import '@babel/polyfill';

const VueUploadComponent = require('vue-upload-component');

Vue.component('file-upload', VueUploadComponent);

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueAwesomeSwiper);
Vue.use(InfiniteLoading, { /* options */ });

new Vue({
    render: (h) => h(App),
    router,
    vuetify,
    store,
}).$mount('#app');
