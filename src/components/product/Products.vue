<template>
    <div class="container">
        <div
            class="products"
        >
            <div class="spacer" />
            <app-product-preview
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
            <infinite-loading
                v-if="dataLoaded"
                @infinite="infiniteHandler"
            />
        </div>
    </div>
</template>

<script>
import ProductPreview from './ProductPreview.vue';
import { loadProducts } from '../../services';

export default {
    components: {
        appProductPreview: ProductPreview,
    },
    data() {
        return {
            start: 0,
            dataLoaded: false,
            products: [],
        };
    },
    methods: {
        fetchProducts(start) {
            loadProducts(this.$store.state.authorization.idToken, start)
                .then((response) => {
                    console.log('Data loading');
                    const allProducts = response.data;
                    this.products = allProducts.filter((product) => product.active === true);
                    this.dataLoaded = true;
                })
                .catch((error) => console.log(error));
        },
        infiniteHandler($state) {
            this.start += 10;
            loadProducts(this.$store.state.authorization.idToken, this.start)
                .then((response) => {
                    if (response.data.length > 0) {
                        const allProducts = response.data;
                        const products = allProducts.filter((product) => product.active === true);
                        // eslint-disable-next-line max-len
                        const newProductList = this.products.concat(products);
                        this.products = newProductList;
                        $state.loaded();
                    } else {
                        this.dataLoaded = false;
                        $state.complete();
                    }
                });
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.fetchProducts(0);
        });
    },
};
</script>

<style>
    .products {
        flex-direction: column;
    }
</style>
