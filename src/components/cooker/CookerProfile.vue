<template>
    <div>
        <div
            v-if="hasProducts"
            class="cooker-profile"
        >
            <img
                class="cooker-profile__img"
                :src="`https://strapi.kameas.ru${user.image[0].url}`"
                alt=""
            >
            <div class="spacer" />
            <div class="container">
                <div class="headline">
                    {{ user.name }}
                </div>
                <div class="cooker-profile__description">
                    {{ user.info }}
                </div>

                <div class="cooker-profile__current-dishes">
                    <div class="headline">
                        {{ user.name }} - блюда
                    </div>
                    <app-product-preview
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                    />
                </div>

                <div class="cooker-profile__prev-dishes">
                    <div class="headline">
                        {{ user.name }} - прошлые блюда
                    </div>
                    <app-product-preview
                        v-for="prevProduct in prevProducts"
                        :key="prevProduct.id"
                        :product="prevProduct"
                    />
                </div>
            </div>
        </div>
        <div v-else>
            У данного пользователя еще нет продуктов.
        </div>
    </div>
</template>

<script>
import axios from '../../axios-database';
import ProductPreview from '../product/ProductPreview.vue';

export default {
    components: {
        appProductPreview: ProductPreview,
    },
    data() {
        return {
            user: null,
            products: [],
            prevProducts: [],
            hasProducts: false,
        };
    },
    methods: {
        getUserData(userId) {
            axios.get(`users?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.authorization.idToken}`,
                },
            })
                .then((response) => {
                    [this.user] = response.data;
                    this.getUserProducts(this.user.id);
                })
                .catch((error) => console.log(error));
        },

        getUserProducts(userId) {
            axios.get(`products?author=${userId}`, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.authorization.idToken}`,
                },
            })
                .then((response) => {
                    if (response.data) {
                        this.hasProducts = true;
                        const allProducts = response.data;
                        this.products = allProducts.filter((product) => product.active === true);
                        // eslint-disable-next-line max-len
                        this.prevProducts = allProducts.filter((product) => product.active === false);
                    } else {
                        this.hasProducts = false;
                    }
                })
                .catch((error) => console.log(error));
        },
    },

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.getUserData(vm.$route.params.id);
        });
    },
};
</script>

<style>
    .cooker-profile__img {
        width: 100%;
    }

    .cooker-profile__description {
        font-size: 14px;
        line-height: 20px;
        color: #868686;
        margin-bottom: 15px;
    }

    .cooker-profile__current-dishes {
        margin-bottom: 15px;
    }

    .cooker-profile__prev-dishes {
        opacity: 50%;
    }

    .cooker-profile__prev-dishes .cooker-profile__item {
        opacity: .5;
    }
</style>
