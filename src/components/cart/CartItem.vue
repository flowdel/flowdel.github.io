<template>
    <div class="product-preview product-preview_type_vertical">
        <div class="product-preview__description">
            <img
                :src="`http://strapi.kameas.ru${item.image[0].url}`"
                alt=""
            >
            <div class="product-preview__info">
                <div class="product-preview__name">
                    {{ item.name }}
                </div>
                <div class="product-preview__price">
                    {{ item.price }} руб.
                </div>
            </div>
        </div>
        <div class="product-preview__prices">
            <input
                v-model="count"
                class="product-preview__amount"
                type="number"
                min="0"
                step="1"
            >
            <div class="product-preview__sum">
                {{ item.price*item.count }} руб.
            </div>
        </div>
        <div class="spacer" />
    </div>
</template>

<script>

export default {
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        count() {
            return this.item.count;
        },
    },
};
</script>

<style>

    .product-preview_type_vertical  {
        display: flex;
        justify-content: space-between;
    }

    .product-preview_type_vertical .product-preview__description {
        display: flex;
        align-items: center;

    }

    .product-preview_type_vertical .product-preview__info {
        display: block;
        margin-bottom: 0;
        margin-left: 10px;
    }

    .product-preview_type_vertical .product-preview__name {
        margin-bottom: 10px;
    }

    .product-preview_type_vertical img {
        width: 100px;
        height: 80px;
    }

    .product-preview__amount {
        height: 60px;
        width: 60px;
        font-size: inherit;
        border: 1px solid #d1cece;
        padding: 10px;
    }

    .product-preview__prices {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .product-preview__sum {
        margin-left: 100px;
    }

</style>
