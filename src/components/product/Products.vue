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
                v-if="loadedData"
                @infinite="infiniteHandler"
            />
            <app-loading v-if="!loadedData" />
        </div>
    </div>
</template>

<script>
import ProductPreview from './ProductPreview.vue';
import { loadProducts } from '../../services';
import Loading from '../LoadingIndicator.vue';

export default {
    components: {
        appProductPreview: ProductPreview,
        appLoading: Loading,
    },
    data() {
        return {
            start: 0,
            loadedData: false,
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
                    this.loadedData = true;
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
