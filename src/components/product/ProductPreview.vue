<template>
    <div>
        <router-link
            :to="{name: 'ProductDetails', params: {id: product.id}}"
            class="product-preview"
        >
            <img
                class="product-preview__img"
                :src="`https://strapi.kameas.ru${product.image[0].url}`"
                alt=""
            >
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

export default {
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
    }
</style>
