<template>
    <div class="signin">
        <v-container
            fluid
            px-4
            py-0
        >
            <img
                class="signin__logo"
                position="center center"
                src="../../../images/logo_3.png"
            >
            <v-form
                ref="form"
                lazy-validation
                @submit="onSubmit"
            >
                <div class="headline">
                    Вход
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.email.$error}"
                >
                    <v-text-field
                        v-model="email"
                        label="E-mail"
                        :error-messages="emailErrors"
                        @blur="$v.email.$touch()"
                        @input="$v.email.$touch()"
                    />
                </div>

                <div
                    class="form-group"
                    :class="{invalid: $v.password.$error}"
                >
                    <v-text-field
                        v-model="password"
                        type="password"
                        :error-messages="passwordErrors"
                        label="Пароль"
                        @blur="$v.password.$touch()"
                        @input="$v.password.$touch()"
                    />
                </div>
                <div class="spacer" />
                <v-btn
                    color="primary"
                    dark
                    width="280"
                    @click="onSubmit"
                >
                    Войти
                </v-btn>
                <v-btn
                    color="primary"
                    outlined
                    dark
                    to="/signup"
                    width="280"
                >
                    Регистрация
                </v-btn>
                <div class="spacer" />
            </v-form>
        </v-container>
    </div>
</template>

<script>
import {
    required, email,
} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    computed: {
        emailErrors() {
            let errors = [];
            if (!this.$v.email.$dirty) return errors;
            if (!this.$v.email.email) {
                errors.push('E-mail должен быть валидным');
            } else if (!this.$v.email.required) {
                errors = [];
                errors.push('Введите email');
            }
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            if (!this.$v.password.required) {
                errors.push('Введите пароль');
            }
            return errors;
        },
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

    .signin__logo {
        width: 145px;
    }

</style>
