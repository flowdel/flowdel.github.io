<template>
    <div>
        <router-link
            :to="{name: 'ProductDetails', params: {id: product.id}}"
            class="product-preview"
        >
            <app-gallery :product="product" />

            <div class="product-preview__info">
                <div class="product-preview__name">
                    {{ product.name }}
                </div>
                <div class="product-preview__price">
                    {{ product.price }} руб.
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>

import Gallery from '../Gallery.vue';

export default {
    components: {
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
    .product-preview {
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }

    .product-preview__info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 15px;
    }

    .product-preview__price {
        color: #40db81
    }

    .product-preview__img {
        margin-bottom: 15px;
        width: 0;
        height: 0;
        padding: 0 100% 65% 0;
        background-size: cover;
    }

    .swiper-button-next, .swiper-button-prev {
        opacity: 0;
    }

</style>
