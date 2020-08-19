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
                <div
                    class="form-group"
                    :class="{invalid: $v.name.$error}"
                >
                    <label
                        class="signup__label"
                        for="name"
                    >Ваше имя:</label>
                    <input
                        id="name"
                        v-model="name"
                        type="text"
                        @blur="$v.name.$touch()"
                    >
                    <p v-if="$v.name.$anyError">
                        Пожалуйста, введите имя!
                    </p>
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.login.$error}"
                >
                    <label
                        class="signup__label"
                        for="login"
                    >Придумайте логин:</label>
                    <input
                        id="login"
                        v-model="login"
                        type="text"
                        @blur="$v.login.$touch()"
                    >
                    <p v-if="$v.login.$anyError">
                        Пожалуйста, введите логин (не менее 6 знаков)!
                    </p>
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.email.$error}"
                >
                    <label
                        class="signup__label"
                        for="email"
                    >Ваш e-mail:</label>
                    <input
                        id="email"
                        v-model="email"
                        type="text"
                        @blur="$v.email.$touch()"
                    >
                    <p v-if="$v.email.$anyError">
                        Пожалуйста, введите правильный email!
                    </p>
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.password.$error}"
                >
                    <label
                        class="signup__label"
                        for="password"
                    >Придумайте пароль:</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        @blur="$v.password.$touch()"
                    >
                    <p v-if="$v.password.$anyError">
                        Пароль должен быть не менее 6 знаков!
                    </p>
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.confirmPassword.$error}"
                >
                    <label
                        class="signup__label"
                        for="confirmPassword"
                    >Повторите пароль:</label>
                    <input
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password"
                        @blur="$v.confirmPassword.$touch()"
                    >
                    <p v-if="$v.confirmPassword.$anyError">
                        Пароль должен совпадать!
                    </p>
                </div>
                <div class="spacer" />
                <app-button
                    :disabled="$v.$invalid"
                >
                    Зарегистрироваться
                </app-button>
                <div class="spacer" />
                <router-link
                    to="/signin"
                >
                    <app-button>Войти</app-button>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import {
    required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import Button from '../Button.vue';

export default {
    components: {
        appButton: Button,
    },
    data() {
        return {
            name: '',
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    validations: {
        email: {
            required,
            email,
        },
        name: {
            required,
        },
        login: {
            required,
            minLen: minLength(6),
        },
        password: {
            required,
            minLen: minLength(6),
        },
        confirmPassword: {
            sameAs: sameAs('password'),
        },
    },
    methods: {
        async onSubmit() {
            await this.$store.dispatch('signup', {
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
    .invalid {
        color: red;
    }

    .invalid input {
        border: 1px solid red;
    }
</style>
