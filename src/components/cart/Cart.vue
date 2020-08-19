<template>
    <div class="container">
        <div class="spacer" />
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
            >
                {{ cart }}
            </app-cart-item>
            <div class="spacer" />
            <app-button
                @click.native="confirmCart"
            >
                Подтвердить
            </app-button>
            <div class="spacer" />
            <app-button
                @click.native="clearCart"
            >
                Очистить корзину
            </app-button>
        </div>
        <div
            v-else
            class="cart cart_empty"
        >
            <i class="far fa-sad-tear" />
            Здесь пока ничего нет...
        </div>
    </div>
</template>

<script>
import { removeCart } from '@/storage';
import { mapGetters } from 'vuex';
import CartItem from './CartItem.vue';
import Button from '../Button.vue';

export default {
    components: {
        appCartItem: CartItem,
        appButton: Button,
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
            this.$router.go();
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
