<template>
    <div class="signin">
        <div class="container">
            <img
                class="signin__logo"
                src="../../../images/logo_2.png"
                alt=""
            >
            <form
                class="signin__form"
                @submit.prevent="onSubmit"
            >
                <div class="headline">
                    Вход
                </div>
                <div class="form-group">
                    <label
                        class="signin__label"
                        for="login"
                    >E-mail:</label>
                    <input
                        id="login"
                        v-model="email"
                        type="text"
                    >
                </div>
                <div class="form-group">
                    <label
                        class="signin__label"
                        for="password"
                    >Пароль:</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                    >
                </div>
                <div class="spacer" />
                <app-button :value="value" />
            </form>
        </div>
    </div>
</template>

<script>
import Button from '../Button.vue';
// import firebase from '../../firebase.js';

export default {
    components: {
        appButton: Button,
    },
    data() {
        return {
            value: 'Войти',
            email: '',
            password: '',
        };
    },
    methods: {
        async onSubmit() {
            await this.$store.dispatch('signin', {
                email: this.email,
                password: this.password,
            });

            this.$router.replace('/products');
        },
    },
};
</script>

<style>

    .signin {
        text-align: center;
    }

    .signin__label {
        display: block;
        margin-bottom: 5px;
        text-align: left;
    }

    .signin__logo {
        width: 145px;
    }

    .signin__form input {
        width: 100%;
        border: 1px solid #d1cece;
        padding: 10px;
        border-radius: 25px;
    }

</style>
