import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import store from './store/store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
    render: (h) => h(App),
    router,
    store,
}).$mount('#app');
