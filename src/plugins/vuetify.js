import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

const mediaQuiery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuiery.addEventListener('change', (event) => {
    this.$vuetify.framework.theme.dark = event.matches;
});

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
    theme: {
        themes: {
            light: {
                primary: '#8BC34A',
                secondary: '#333131',
            },
            dark: {
                primary: '#8BC34A',
                secondary: '#6b6a6a',
            },
        },
        dark: mediaQuiery.matches,
    },
});
