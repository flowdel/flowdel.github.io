<template>
    <swiper
        class="swiper"
    >
        <swiper-slide
            v-for="image in product.image"
            :key="image.url"
        >
            <div
                class="product-preview__img"
                :style="{
                    backgroundImage: `url(https://strapi.kameas.ru${image.url})`,
                }"
            />
        </swiper-slide>
        <div
            slot="button-next"
            class="swiper-button-next"
        />
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    directives: {
        swiper: directive,
    },
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
