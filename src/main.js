import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import App from './App.vue';
import store from './store/store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');
