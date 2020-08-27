<template>
    <!-- <div id="app">
        <app-header />
        <router-view />
        <notifications group="auth" />
    </div> -->

    <v-app>
        <v-app-bar
            app
        >
            <v-app-bar-nav-icon
                @click="drawer = true"
            />
            <v-btn
                icon
                active-class="primary"
                to="/cart"
            >
                <v-icon>
                    mdi-cart
                </v-icon>
            </v-btn>

            <v-btn
                v-if="!$vuetify.theme.dark"
                icon
                @click="changeTheme"
            >
                <v-icon>
                    mdi-moon-waning-crescent
                </v-icon>
            </v-btn>
            <v-btn
                v-if="$vuetify.theme.dark"
                icon
                @click="changeTheme"
            >
                <v-icon>
                    mdi-white-balance-sunny
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-navigation-drawer
                v-model="drawer"
                app
                absolute
            >
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group
                        active-class="primary"
                    >
                        <v-list-item to="/products">
                            <v-list-item-icon>
                                <v-icon>mdi-food</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Продукты</v-list-item-title>
                            <router-link
                                class="nav__link"
                                to="/products"
                            />
                        </v-list-item>

                        <v-list-item :to="`/profile/${userId}`">
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Мой профиль</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/settings">
                            <v-list-item-icon>
                                <v-icon>mdi-cog</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Настройки</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/new-product">
                            <v-list-item-icon>
                                <v-icon>mdi-basket-plus</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Продать блюдо</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/cart">
                            <v-list-item-icon>
                                <v-icon>mdi-cart</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Корзина</v-list-item-title>
                        </v-list-item>

                        <v-list-item
                            v-if="isAuthorized"
                            @click="signout"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Выйти</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <router-view />
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import store from './store/store';
import { getIdToken, getUserId } from './storage';

export default {
    name: 'App',
    data() {
        return {
            drawer: false,
        };
    },
    computed: {
        ...mapState({
            userId: (state) => state.authorization.userId,
        }),
        ...mapGetters([
            'isAuthorized',
        ]),
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
    methods: {
        async signout() {
            await this.$store.dispatch('signout');
            this.$router.replace('/signin');
        },
        changeTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
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
        margin: 0;
    }

    .headline {
        font-size: 18px;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .spacer {
        height: 1px;
        margin-bottom: 15px;
    }
</style>
