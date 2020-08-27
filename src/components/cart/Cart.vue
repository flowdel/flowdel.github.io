<template>
    <v-container
        fluid
        px-4
        py-0
    >
        <div class="headline">
            Корзина
        </div>
        <div
            v-if="cart.length > 0"
            class="cart cart_full"
        >
            <app-cart-item
                v-for="item in cart"
                :key="item.id"
                :item="item"
            />
            <div class="spacer" />
            <v-btn
                color="primary"
                dark
                width="280"
                @click="confirmCart"
            >
                Подтвердить
            </v-btn>
            <div class="spacer" />
            <v-btn
                color="primary"
                outlined
                dark
                width="280"
                @click="clearCart"
            >
                Очистить корзину
            </v-btn>
        </div>

        <div
            v-else
            class="cart cart_empty"
        >
            <i class="far fa-sad-tear" />
            Здесь пока ничего нет...
        </div>
    </v-container>
</template>

<script>
import { removeCart } from '@/storage';
import { mapGetters } from 'vuex';
import CartItem from './CartItem.vue';

export default {
    components: {
        appCartItem: CartItem,
    },
    computed: {
        ...mapGetters([
            'cart',
        ]),
    },
    created() {
        this.$store.dispatch('getCart');
    },
    methods: {
        confirmCart() {
            this.clearCart();
            this.$router.replace('/confirm');
        },

        clearCart() {
            removeCart();
        },
    },
};
</script>

<style>
    .cart_empty {
        height: calc(100vh - 200px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        text-align: center;
        line-height: 3em;
    }

    .cart_empty i {
        font-size: 100px;
        color: #d1cece;
    }
</style>
