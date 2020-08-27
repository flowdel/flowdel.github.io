<template>
    <div>
        <v-card class="pa-3">
            <div class="product-preview product-preview_type_vertical">
                <div class="product-preview__description">
                    <div class="product-preview__info">
                        <div class="subtitle-1">
                            {{ item.name }}
                        </div>
                        <div class="caption">
                            {{ item.price }} руб.
                        </div>
                    </div>
                </div>
                <div class="product-preview__prices">
                    <div class="product-preview__amount">
                        <v-btn
                            class="mx-2"
                            fab
                            x-small
                            color="primary"
                            elevation="0"
                            @click="increaseCount"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <span>
                            {{ item.count }}
                        </span>
                        <v-btn
                            class="mx-2"
                            fab
                            x-small
                            color="primary"
                            elevation="0"
                            @click="decreaseCount"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                    </div>

                    <div class="caption">
                        Всего: {{ item.price*item.count }} руб.
                    </div>
                </div>
            </div>
        </v-card>
        <div class="spacer" />
    </div>
</template>

<script>
import { SERVER_URL } from '@/constants';

export default {
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            SERVER_URL,
        };
    },
    computed: {
        count() {
            return this.item.count;
        },
    },
    methods: {
        increaseCount() {
            this.item.count += 1;
        },

        decreaseCount() {
            this.item.count -= 1;
        },
    },
};
</script>

<style>
    .product-preview_type_vertical  {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
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
        word-break: break-all;
        word-break: break-word;
        margin: 0 5px 10px 0;
    }

    .product-preview_type_vertical img {
        width: 80px;
        height: 50px;
    }

    .product-preview__prices {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .product-preview__count {
        height: 20px;
        width: 20px;
        border: 1px solid #d1cece;
        margin: 0 10px;
        text-align: center;
    }

    .product-preview__amount {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px
    }

    .product-preview__sum {
        font-size: 10px;
    }

    .product-preview__prices-plus-button,
    .product-preview__prices-minus-button {
        display: inline;
        font-size: 20px
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

</style>
