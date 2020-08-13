<template>
    <div class="signup">
        <div class="container">
            <img
                class="signup__logo"
                src="../../../images/logo_2.png"
                alt=""
            >
            <form
                class="signup__form"
                @submit.prevent="onSubmit"
            >
                <div class="headline">
                    Регистрация
                </div>
                <div class="form-group">
                    <label
                        class="signup__label"
                        for="name"
                    >Ваше имя:</label>
                    <input
                        id="name"
                        v-model="name"
                        type="text"
                    >
                </div>
                <div class="form-group">
                    <label
                        class="signup__label"
                        for="login"
                    >Придумайте логин:</label>
                    <input
                        id="login"
                        v-model="login"
                        type="text"
                    >
                </div>
                <div class="form-group">
                    <label
                        class="signup__label"
                        for="email"
                    >Ваш e-mail:</label>
                    <input
                        id="email"
                        v-model="email"
                        type="text"
                    >
                </div>
                <div class="form-group">
                    <label
                        class="signup__label"
                        for="password"
                    >Придумайте пароль:</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                    >
                </div>
                <div class="form-group">
                    <label
                        class="signup__label"
                        for="confirmPassword"
                    >Повторите пароль:</label>
                    <input
                        id="confirmPassword"
                        v-model="confirmPassword"
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

export default {
    components: {
        appButton: Button,
    },
    data() {
        return {
            value: 'Зарегистрироваться',
            name: '',
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('signup', {
                name: this.name,
                login: this.login,
                email: this.email,
                password: this.password,
            });
            this.$router.replace('/products');
        },
    },
};
</script>

<style>

    .signup {
        text-align: center;
    }

    .signup__label {
        display: block;
        margin-bottom: 5px;
        text-align: left;
    }

    .signup__logo {
        width: 145px;
    }

    .signup__form input {
        width: 100%;
        border: 1px solid #d1cece;
        padding: 10px;
        border-radius: 25px;
    }

</style>
