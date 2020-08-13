<template>
    <div class="container">
        <div class="spacer" />
        <div v-if="cart">
            <div class="headline">
                Корзина
            </div>
            <app-cart-item
                v-for="item in cart"
                :key="item.id"
                :item="item"
            >
                {{ cart }}
            </app-cart-item>
            <div class="spacer" />
            <app-button
                value="Подтвердить"
                @click.native="confirmCart"
            />
            <div class="spacer" />
            <app-button
                value="Очистить корзину"
                @click.native="clearCart"
            />
        </div>
        <div v-else>
            Здесь пока ничего нет...
        </div>
    </div>
</template>

<script>
import CartItem from './CartItem.vue';
import Button from '../Button.vue';

export default {

    components: {
        appCartItem: CartItem,
        appButton: Button,
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        },
    },

    methods: {
        confirmCart() {
            this.$router.replace('/confirm');
        },

        clearCart() {
            localStorage.removeItem('cart');
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.dispatch('getCart');
        });
    },
};
</script>

<style>
</style>
