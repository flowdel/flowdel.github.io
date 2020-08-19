/* eslint-disable no-param-reassign */
import { getCart, setCart } from '@/storage';

const state = {
    cart: [],
};

const mutations = {
    addItemToCart($state, item) {
        const productIndex = $state.cart.findIndex((product) => product.id === item.id);
        if (productIndex >= 0) {
            $state.cart[productIndex].count += 1;
        } else {
            $state.cart.push(item);
        }
    },

    saveCart($state, cart) {
        $state.cart = cart;
    },

};

const actions = {
    addItemToCart({ commit, dispatch }, item) {
        commit('addItemToCart', item);
        dispatch('saveCart', state.cart);
    },

    saveCart({ commit }, cart) {
        commit('saveCart', cart);
        setCart(JSON.stringify(cart));
    },

    getCart({ commit }) {
        getCart()
            .then((response) => {
                const cart = JSON.parse(response);
                if (cart) {
                    commit('saveCart', cart);
                }
            });
    },
};

const getters = {
    cart($state) {
        return $state.cart;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
