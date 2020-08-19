<template>
    <div id="app">
        <app-header />
        <router-view />
        <notifications group="auth" />
    </div>
</template>

<script>
import Header from './components/header/Header.vue';
import store from './store/store';
import { getIdToken, getUserId } from './storage';

export default {
    name: 'App',
    components: {
        appHeader: Header,
    },
    async created() {
        const path = localStorage.getItem('path');

        if (path) {
            localStorage.removeItem('path');
            this.$router.replace(path);
            return;
        }

        const idToken = await getIdToken();
        const userId = await getUserId();

        await store.dispatch('tryAutoLogin', {
            idToken,
            userId,
        });
    },

};
</script>

<style>

  *,
  *::before,
  *::after {
      box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #333131;
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  .spacer {
    height: 1px;
    margin-bottom: 15px;
  }

  .headline {
    font-size: 22px;
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 10px;
  }
</style>
