<template>
    <loading
        :active.sync="isLoading"
        :is-full-page="fullPage"
        color="#d1cece"
    />
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    components: {
        Loading,
    },
    data() {
        return {
            fullPage: true,
            isLoading: true,
        };
    },
};
</script>
