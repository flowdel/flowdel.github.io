<template>
    <v-carousel
        height="200"
        :show-arrows="false"
        hide-delimiter-background
    >
        <v-carousel-item
            v-for="(image, index) in product.image"
            :key="index"
            :src="SERVER_URL+image.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
        />
    </v-carousel>
</template>

<script>
import { SERVER_URL } from '@/constants';

export default {
    props: {
        product: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            SERVER_URL,
        };
    },
};
</script>
