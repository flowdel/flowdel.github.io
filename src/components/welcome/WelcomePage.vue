<template>
    <div
        id="welcome"
        class="welcome"
    >
        <div class="container">
            <img
                class="welcome-logo"
                src="../../../images/logo_3.png"
                alt=""
            >
            <h1 class="welcome-headline">
                Накорми соседа!
            </h1>

            <div class="welcome-links">
                <v-btn
                    color="primary"
                    dark
                    width="280"
                    to="/signin"
                >
                    Войти
                </v-btn>
                <v-btn
                    color="primary"
                    outlined
                    dark
                    width="280"
                    to="/signup"
                >
                    Зареегистрироваться
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style>
    .welcome {
        margin: 0 auto;
        width: 50%;
        /* min-height: 100vh; */
    }

    .welcome-headline {
        margin: 0;
        margin-bottom: 20px;
        font-weight: 300;
        text-align: center;
    }

    .welcome-links {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .welcome-link {
        color: #333333;
        border: 1px solid #b3b3b3;
        padding: 5px;
        text-decoration: none;
        border-radius: 25px;
        padding: 5px 50px;
        min-width: 250px;
    }

    .welcome-link:first-child {
        margin-bottom: 5px;
    }

    .welcome-link:hover {
        background-color: #f3f3f3;
    }

    .welcome-logo {
        display: block;
        width: 145px;
        margin: 0 auto;
    }
</style>
