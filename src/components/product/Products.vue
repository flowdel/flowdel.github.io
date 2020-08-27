<template>
    <v-container
        fluid
    >
        <div
            class="products"
        >
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
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { loadProducts } from '@/services';

import ProductPreview from './ProductPreview.vue';
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
    computed: {
        ...mapState({
            idToken: (state) => state.authorization.idToken,
        }),
        isAuthorized() {
            return this.$store.getters.isAuthorized;
        },
    },
    created() {
        this.fetchProducts(0);
    },
    methods: {
        fetchProducts(start) {
            loadProducts(this.idToken, start)
                .then((response) => {
                    const allProducts = response.data;
                    this.products = allProducts.filter((product) => product.active === true);
                    this.loadedData = true;
                });
        },
        infiniteHandler($state) {
            this.start += 10;
            loadProducts(this.idToken, this.start)
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
};
</script>

<style>
    .products {
        flex-direction: column;
    }
</style>
