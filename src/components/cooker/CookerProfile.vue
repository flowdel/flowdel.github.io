<template>
    <div>
        <div class="cooker-profile">
            <img
                v-if="user.image[0]"
                class="cooker-profile__img"
                :src="`${SERVER_URL}${user.image[0].url}`"
                alt=""
            >
            <img
                v-else
                class="cooker-profile__img"
                src="../../../images/empty_profile.png"
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
import { SERVER_URL, EMPTY_IMAGE_URL } from '@/constants';

import { mapState } from 'vuex';
import { getUserProducts, getUserData } from '@/services';
import ProductPreview from '../product/ProductPreview.vue';
import Loading from '../LoadingIndicator.vue';

export default {
    components: {
        appProductPreview: ProductPreview,
        appLoading: Loading,
    },
    data() {
        return {
            user: {},
            products: [],
            prevProducts: [],
            hasProducts: false,
            loadedData: false,
            SERVER_URL,
            EMPTY_IMAGE_URL,
        };
    },
    computed: {
        ...mapState({
            idToken: (state) => state.authorization.idToken,
        }),
    },

    created() {
        this.getUserData(this.$route.params.id);
    },
    methods: {
        getUserData(userId) {
            getUserData(this.idToken, userId)
                .then((response) => {
                    [this.user] = response.data;
                    this.getUserProducts(this.user.id);
                });
        },

        getUserProducts(userId) {
            getUserProducts(userId, this.idToken, true)
                .then((response) => {
                    this.loadedData = true;
                    if (response.data.length > 0) {
                        this.hasProducts = true;
                        this.products = response.data;
                        // eslint-disable-next-line max-len
                        getUserProducts(userId, this.idToken, false)
                            .then((res) => {
                                this.prevProducts = res.data;
                            });
                    } else {
                        this.hasProducts = false;
                    }
                });
        },
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
