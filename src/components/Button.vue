<template>
    <button class="button">
        {{ value }}
    </button>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: null,
        },
    },
};
</script>

<style>
    .button {
        color: #ffffff;
        background-color: #e6c269;
        border: 0;
        padding: 11px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        width: 100%;
    }
</style>
