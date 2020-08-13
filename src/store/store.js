import Vue from 'vue';
import Vuex from 'vuex';

import authorization from './modules/authorization';
import cart from './modules/cart';
import product from './modules/product';

Vue.use(Vuex);

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
    },
    modules: {
        authorization,
        cart,
        product,
    },
});
