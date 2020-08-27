<template>
    <div
        v-if="product"
        class="product-detail"
    >
        <app-gallery :product="product" />
        <v-container
            fluid
            px-4
            py-4
        >
            <div class="product-detail__info">
                <div class="product-detail__name">
                    {{ product.name }}
                </div>
                <div class="product-detail__price">
                    {{ product.price }} руб.
                </div>
            </div>

            <router-link
                :to="{name: 'CookerProfile', params: {id: product.author.id}}"
                class="product-detail__author"
            >
                <div
                    v-if="product.author.image[0]"
                    class="product-detail__author-img"
                    :style="{backgroundImage: `url(${SERVER_URL}${product.author.image[0].url})`}"
                />
                <div
                    class="product-detail__author-name secondary--text"
                >
                    {{ product.author.name }}
                </div>
            </router-link>

            <div class="product-detail__description">
                {{ product.description }}
            </div>
            <div class="product-detail__details">
                <table class="product-detail__payments">
                    <tr>
                        <td>Оплата:</td>
                        <td>{{ paymentMethod }}</td>
                    </tr>
                    <tr>
                        <td>Доставка:</td>
                        <td>{{ delivery }}</td>
                    </tr>
                    <tr>
                        <td>Для веганов:</td>
                        <td>{{ vegan }}</td>
                    </tr>
                </table>
            </div>
            <v-btn
                v-if="product.active"
                color="primary"
                light
                width="280"
                @click="addItemToCart"
            >
                Добавить в корзину
            </v-btn>
            <div class="spacer" />
            <v-btn
                v-if="authUser && product.active"
                color="primary"
                light
                outlined
                width="280"
                @click="removeProduct"
            >
                Закрыть объявление
            </v-btn>
            <app-loading v-if="!loadedData" />
        </v-container>
    </div>
</template>

<script>
import { SERVER_URL, EMPTY_IMAGE_URL } from '@/constants';
import { mapState } from 'vuex';
import { getProductData, removeProduct } from '@/services';
import Gallery from '../Gallery.vue';
import Loading from '../LoadingIndicator.vue';

export default {
    components: {
        appGallery: Gallery,
        appLoading: Loading,
    },
    data() {
        return {
            product: null,
            loadedData: false,
            SERVER_URL,
            EMPTY_IMAGE_URL,
        };
    },
    computed: {
        ...mapState({
            idToken: (state) => state.authorization.idToken,
            userId: (state) => state.authorization.userId,
        }),
        paymentMethod() {
            return this.product.paymentMethod === 'cash' ? 'Наличные' : 'Перевод на карту';
        },
        delivery() {
            return this.product.delivery === 'pickUp' ? 'Забрать у меня' : 'Доставлю на дом';
        },
        vegan() {
            return this.product.vegan ? 'Да' : 'Нет';
        },
        authUser() {
            return this.product.author.id === this.userId;
        },
    },
    created() {
        this.getProductData(this.$route.params.id);
    },
    methods: {
        getProductData(productId) {
            getProductData(productId, this.idToken)
                .then((response) => {
                    this.loadedData = true;
                    [this.product] = response.data;
                });
        },

        addItemToCart() {
            const productData = {
                name: this.product.name,
                price: this.product.price,
                image: this.product.image,
                count: 1,
                id: this.product.id,
            };
            this.$store.dispatch('addItemToCart', productData);
        },
        removeProduct() {
            this.product.active = false;
            removeProduct(this.product, this.idToken);
        },

    },
};
</script>

<style>

    .product-detail__info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .product-detail__name {
        font-weight: 500;
    }

    .product-detail__price {
        color: #8BC34A
    }

    .product-detail__img {
        width: 100%;
        margin-bottom: 15px;
    }

    .product-detail__author {
        display: flex;
        align-items: center;
        text-decoration: none;
        margin-bottom: 15px;
    }

    .product-detail__author-img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
    }

    .product-detail__author-name {
        margin-left: 20px;
    }

    .product-detail__description {
        font-size: 14px;
        margin-bottom: 15px;
        line-height: 20px;
        color: #868686;
    }

    .product-detail__payments {
        font-size: 12px;
        margin-bottom: 20px;
    }

    .product-detail__payments td {
        padding-right: 10px;
    }

</style>
