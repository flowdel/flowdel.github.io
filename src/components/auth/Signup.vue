<template>
    <div class="signup">
        <v-container
            fluid
            px-4
            py-0
        >
            <img
                class="signup__logo"
                src="../../../images/logo_3.png"
                alt=""
            >
            <v-form
                lazy-validation
                @submit.prevent="onSubmit"
            >
                <div class="headline">
                    Регистрация
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.name.$error}"
                >
                    <v-text-field
                        v-model="name"
                        label="Имя:"
                        :error-messages="nameErrors"
                        @blur="$v.name.$touch()"
                        @input="$v.name.$touch()"
                    />
                </div>

                <div
                    class="form-group"
                    :class="{invalid: $v.login.$error}"
                >
                    <v-text-field
                        v-model="login"
                        label="Придумайте логин:"
                        :error-messages="loginErrors"
                        @blur="$v.login.$touch()"
                        @input="$v.login.$touch()"
                    />
                </div>

                <div
                    class="form-group"
                    :class="{invalid: $v.email.$error}"
                >
                    <v-text-field
                        v-model="email"
                        label="Ваш e-mail:"
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
                        label="Пароль:"
                        @blur="$v.password.$touch()"
                        @input="$v.password.$touch()"
                    />
                </div>
                <div
                    class="form-group"
                    :class="{invalid: $v.confirmPassword.$error}"
                >
                    <v-text-field
                        v-model="confirmPassword"
                        type="password"
                        :error-messages="confirmPasswordErrors"
                        label="Введите пароль еще раз:"
                        @blur="$v.confirmPassword.$touch()"
                        @input="$v.confirmPassword.$touch()"
                    />
                </div>
                <div class="spacer" />
                <v-btn
                    color="primary"
                    dark
                    width="280"
                >
                    Зарегистрироваться
                </v-btn>
                <v-btn
                    outlined
                    color="primary"
                    dark
                    to="/signin"
                    width="280"
                >
                    Вход
                </v-btn>
                <div class="spacer" />
            </v-form>
        </v-container>
    </div>
</template>

<script>
import {
    required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            name: '',
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    computed: {
        nameErrors() {
            let error = '';
            if (!this.$v.name.$dirty) return error;
            if (!this.$v.name.required) {
                error = 'Введите имя';
            }
            return error;
        },
        loginErrors() {
            let error = '';
            if (!this.$v.login.$dirty) return error;
            if (!this.$v.login.required) {
                error = 'Введите логин';
            }
            return error;
        },
        emailErrors() {
            let error = '';
            if (!this.$v.email.$dirty) return error;
            if (!this.$v.email.email) {
                error = 'E-mail должен быть валидным';
            } else if (!this.$v.email.required) {
                error = 'Введите email';
            }
            return error;
        },
        passwordErrors() {
            let error = '';
            if (!this.$v.password.$dirty) return error;
            if (!this.$v.password.required) {
                error = 'Введите пароль';
            } else if (!this.$v.password.minLength) {
                error = 'Пароль должен быть не менее 6 знаков';
            }
            return error;
        },
        confirmPasswordErrors() {
            let error = '';
            if (!this.$v.confirmPassword.$dirty) return error;
            if (!this.$v.confirmPassword.required) {
                error = 'Введите пароль еще раз';
            } else if (!this.$v.confirmPassword.sameAs) {
                error = 'Пароли должны быть одинаковыми';
            }
            return error;
        },
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

</style>
