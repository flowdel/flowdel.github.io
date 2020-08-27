<template>
    <v-card
        class="mx-auto mb-3"
        max-width="400"
        :to="{name: 'ProductDetails', params: {id: product.id}}"
    >
        <app-gallery :product="product" />

        <v-card-title class="py-2">
            {{ product.name }}
        </v-card-title>

        <v-card-subtitle
            class="py-3"
        >
            {{ product.price }} руб.
        </v-card-subtitle>
    </v-card>
</template>

<script>
import Gallery from '../Gallery.vue';

export default {
    components: {
        // appProductPreview: ProductPreview,
        appGallery: Gallery,
    },
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style>
</style>
