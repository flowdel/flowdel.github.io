<template>
    <div
        v-if="product"
        class="product-detail"
    >
        <app-gallery :product="product" />
        <div class="container">
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
                    :style="{backgroundImage: `url(https://strapi.kameas.ru${product.author.image[0].url})`}"
                />
                <div
                    v-else
                    class="product-detail__author-img"
                    style="{backgroundImage: 'url(https://place-hold.it/30)'}"
                />
                <div class="product-detail__author-name">
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

            <app-button
                v-if="product.active"
                :value="value"
                @click.native="addItemToCart"
            />
            <div class="spacer" />
            <app-button
                v-if="authUser && product.active"
                value="Закрыть объявление"
                @click.native="removeProduct"
            />
            <app-loading v-if="!loadedData" />
        </div>
    </div>
</template>

<script>
import Button from '../Button.vue';
import Gallery from '../Gallery.vue';
import Loading from '../LoadingIndicator.vue';
import { getProductData, removeProduct } from '../../services';

export default {
    components: {
        appButton: Button,
        appGallery: Gallery,
        appLoading: Loading,
    },
    data() {
        return {
            value: 'Добавить в корзину',
            product: null,
            loadedData: false,
        };
    },
    computed: {
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
            return this.product.author.id === this.$store.state.authorization.userId;
        },
    },
    created() {
        this.getProductData(this.$route.params.id);
    },
    methods: {
        getProductData(productId) {
            getProductData(productId, this.$store.state.authorization.idToken)
                .then((response) => {
                    this.loadedData = true;
                    [this.product] = response.data;
                })
                .catch((error) => console.log(error));
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
        // eslint-disable-next-line no-param-reassign
            this.product.active = false;
            removeProduct(this.product, this.$store.state.authorization.idToken)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.log(error));
        },

    },
    // beforeRouteEnter(to, from, next) {
    //     next((vm) => {
    //         vm.getProductData(vm.$route.params.id);
    //     });
    // },
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
        color: #40db81
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
        color: #333131;
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
