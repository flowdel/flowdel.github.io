<template>
    <div>
        <div class="cooker-profile">
            <img
                v-if="user.image[0]"
                class="cooker-profile__img"
                :src="`https://strapi.kameas.ru${user.image[0].url}`"
                alt=""
            >
            <img
                v-else
                class="cooker-profile__img"
                src="https://strapi.kameas.ru/uploads/empty_profile_536f5a8db1.png"
            >
            <div class="spacer" />
            <div class="container">
                <div class="headline">
                    {{ user.name }}
                </div>
                <div class="cooker-profile__description">
                    {{ user.info }}
                </div>

                <div
                    v-if="hasProducts"
                    class="cooker-profile__current-dishes"
                >
                    <div class="headline">
                        {{ user.name }} - блюда
                    </div>
                    <app-product-preview
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                    />
                </div>

                <div
                    v-if="hasProducts"
                    class="cooker-profile__prev-dishes"
                >
                    <div class="headline">
                        {{ user.name }} - прошлые блюда
                    </div>
                    <app-product-preview
                        v-for="prevProduct in prevProducts"
                        :key="prevProduct.id"
                        :product="prevProduct"
                    />
                </div>
                <div v-if="!hasProducts && loadedData">
                    У данного пользователя еще нет продуктов.
                </div>
            </div>
        </div>
        <app-loading v-if="!loadedData" />
    </div>
</template>

<script>
import axios from '../../axios-database';
import ProductPreview from '../product/ProductPreview.vue';
import Loading from '../LoadingIndicator.vue';

export default {
    components: {
        appProductPreview: ProductPreview,
        appLoading: Loading,
    },
    data() {
        return {
            user: null,
            products: [],
            prevProducts: [],
            hasProducts: false,
            loadedData: false,
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
                    this.loadedData = true;
                    if (response.data.length > 0) {
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
