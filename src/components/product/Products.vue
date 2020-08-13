<template>
    <div class="container">
        <div class="products">
            <div class="spacer" />
            <app-product-preview
                v-for="product in products"
                :key="product.id"
                :product="product"
            />

            <!-- <button @click="sendData">Send Data</button> -->
        </div>
    </div>
</template>

<script>
import ProductPreview from './ProductPreview.vue';

export default {
    components: {
        appProductPreview: ProductPreview,
    },
    computed: {
        products() {
            return this.$store.getters.productList;
        },
    },
    methods: {

    },
    beforeRouteEnter(to, from, next) {
        console.log(123);
        next((vm) => {
            vm.$store.dispatch('fetchProducts');
        });
    },
};
</script>

<style>
    .products {
        flex-direction: column;
    }
</style>
