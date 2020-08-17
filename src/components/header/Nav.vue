<template>
    <nav
        id="nav"
        class="nav"
    >
        <router-link
            class="nav__link"
            to="/products"
        >
            Продукты
        </router-link>
        <router-link
            class="nav__link"
            to="/settings"
        >
            Настройки
        </router-link>
        <router-link
            class="nav__link"
            :to="`/profile/${userId}`"
        >
            Мой профиль
        </router-link>
        <router-link
            class="nav__link"
            to="/new-product"
        >
            Продать блюдо
        </router-link>
        <router-link
            class="nav__link"
            to="/cart"
        >
            Корзина (<span>0</span>)
        </router-link>
        <div
            v-if="isAuthorized"
            class="nav__link"
            @click="signout"
        >
            Выйти
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isAuthorized() {
            return this.$store.getters.isAuthorized;
        },
        userId() {
            return this.$store.state.authorization.userId;
        },
    },
    methods: {
        async signout() {
            await this.$store.dispatch('signout');
            this.$router.replace('/signin');
        },
    },
};
</script>

<style>
    .nav {
        font-size: 9px;
        text-transform: uppercase;
        position: absolute;
        background-color: #ffffff;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 2
    }

    .nav__link {
        display: block;
        cursor: pointer;
        padding: 10px;
        color: #333131;
        border-top: 1px solid #d1cece;
        text-decoration: none;
    }

    .nav__link:last-child {
        border-bottom: 1px solid #d1cece;
    }

    .nav__link:hover {
        color: #e6c269;
    }
</style>
