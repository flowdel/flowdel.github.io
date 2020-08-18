<template>
    <header
        id="header"
        class="header"
    >
        <div class="header__container">
            <router-link
                class="header__logo"
                data-scroll="#intro"
                tag="div"
                to="/products"
            >
                <img
                    src="../../../images/logo_2.png"
                    alt=""
                >
            </router-link>

            <div class="header__nav">
                <app-nav
                    v-if="showNav"
                    v-click-outside="hideNavigation"
                />
            </div>

            <div class="header__actions">
                <router-link
                    to="/cart"
                    class="header__cart"
                >
                    <i class="fas fa-shopping-cart" /> ({{ productsAmount }})
                </router-link>
                <app-nav-toggle
                    :is-active="showNav"
                    @click.native="showNavigation"
                />
            </div>
        </div>
    </header>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import Nav from './Nav.vue';
import NavToggle from './NavToggle.vue';

export default {
    components: {
        appNav: Nav,
        appNavToggle: NavToggle,
    },
    directives: {
        ClickOutside,
    },
    data() {
        return {
            showNav: false,
        };
    },
    computed: {
        productsAmount() {
            return this.$store.state.cart.cart.length;
        },
    },
    watch: {
        $route() {
            this.showNav = false;
        },
    },
    mounted() {
        // prevent click outside event with popupItem.
        this.popupItem = this.$el;
    },
    methods: {
        showNavigation() {
            this.showNav = !this.showNav;
        },
        hideNavigation() {
            if (this.showNav) {
                this.showNav = false;
            }
        },
    },
};
</script>

<style>
    .header {
        border-bottom: 1px solid #d1cece;
    }

    .header__container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-right: 15px;
        padding-left: 15px;
        position: relative;
    }

    .header__logo img {
        display: block;
        height: 40px;
        width: 40px;
    }

    .header__actions {
        display: flex;
    }

    .header__cart {
        color: #333131;
        text-decoration: none;
        padding: 5px;
    }

    .header__cart:hover {
        cursor: pointer;
        color: #b1aeae;
    }
</style>
