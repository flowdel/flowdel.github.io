/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

// import router from '../../router';
import {
    setIdToken, removeIdToken, setUserId, removeUserId,
} from '@/storage';

import { signin, signup } from '@/services';

Vue.use(Vuex);

const state = {
    idToken: null,
    userId: null,
    user: null,
};

const mutations = {
    authUser($state, userData) {
        $state.idToken = userData.idToken;
        $state.userId = userData.userId;
    },

    storeUser($state, user) {
        $state.user = user;
    },

    clearAuthData($state) {
        $state.idToken = null;
        $state.userId = null;
    },
};

const actions = {

    async signin({ commit }, authData) {
        try {
            const response = await signin(authData);

            commit('authUser', {
                idToken: response.data.jwt,
                userId: response.data.user.id,
            });
            commit('storeUser', {
                email: authData.email,
                password: authData.password,
                userId: response.data.user.id,
                idToken: response.data.jwt,
            });
            setIdToken(response.data.jwt);
            setUserId(response.data.user.id);
        } catch {
            //
        }
    },

    async signup({ commit }, authData) {
        const response = await signup(authData);

        commit('authUser', {
            idToken: response.data.jwt,
            userId: response.data.user.id,
        });
        commit('storeUser', {
            email: authData.email,
            password: authData.password,
            userId: response.data.user.id,
        });
        setIdToken(response.data.jwt);
        setUserId(response.data.user.id);
        // router.replace('/products');
    },

    signout({ commit }) {
        commit('clearAuthData');
        // router.replace('/signin');
        removeIdToken();
        removeUserId();
    },

    async tryAutoLogin({ commit }, payload) {
        if (!payload.idToken) return;
        await commit('authUser', {
            idToken: payload.idToken,
            userId: payload.userId,
        });
    },

};

const getters = {
    isAuthorized($state) {
        return $state.userId !== null;
    },

    user($state) {
        return $state.user;
    },

};

export default {
    state,
    mutations,
    actions,
    getters,
};
