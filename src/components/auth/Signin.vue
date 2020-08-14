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
                <div
                    class="form-group"
                    :class="{invalid: $v.email.$error}"
                >
                    <label
                        class="signin__label"
                        for="login"
                    >E-mail:</label>
                    <input
                        id="login"
                        v-model="email"
                        type="text"
                        @blur="$v.email.$touch()"
                    >
                    <p v-if="$v.email.$anyError">
                        Введите email.
                    </p>
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.password.$error}"
                >
                    <label
                        class="signin__label"
                        for="password"
                    >Пароль:</label>
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        @blur="$v.password.$touch()"
                    >
                    <p v-if="$v.password.$anyError">
                        Введите пароль.
                    </p>
                </div>
                <div class="spacer" />
                <app-button :value="value" />
            </form>
        </div>
    </div>
</template>

<script>
import {
    required, email,
} from 'vuelidate/lib/validators';
import Button from '../Button.vue';

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
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
        },
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
