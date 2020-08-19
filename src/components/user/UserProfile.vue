<template>
    <div class="container">
        <div class="spacer" />
        <div class="headline">
            Профиль
        </div>
        <form
            action=""
            class="user-profile"
        >
            <label for="user-profile__name">Имя:</label>
            <input
                id="user-profile__name"
                v-model="user.name"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >

            <label for="user-profile__address">Адрес:</label>
            <input
                id="user-profile__address"
                v-model="user.address"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >
            <label for="user-profile__email">Почта:</label>
            <input
                id="user-profile__email"
                v-model="user.email"
                class="user-profile__input"
                type="email"
                :disabled="!isEditing"
            >
            <label for="user-profile__number">Телефон:</label>
            <input
                id="user-profile__number"
                v-model="user.number"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >
            <label for="file">Загрузите фото блюда:</label>
            <input
                id="file"
                class="new-product__input"
                type="file"
                :disabled="!isEditing"
                @change="handleFileUpload"
            >
            <label for="user-profile__info">О себе:</label>
            <input
                id="user-profile__info"
                v-model="user.info"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >
        </form>
        <app-button
            v-if="!isEditing"
            @click.native="editUserData"
        >
            Редактировать
        </app-button>
        <app-button
            v-else
            @click.native="updateUserData"
        >
            Сохранить
        </app-button>
        <app-loading v-if="!loadedData" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserData, saveNewProfilePicture, saveUserData } from '@/services';
import Button from '../Button.vue';
import Loading from '../LoadingIndicator.vue';

export default {

    components: {
        appButton: Button,
        appLoading: Loading,
    },
    data() {
        return {
            user: {},
            isEditing: false,
            file: null,
            loadedData: false,
        };
    },
    computed: {
        ...mapState({
            idToken: (state) => state.authorization.idToken,
            userId: (state) => state.authorization.userId,
        }),
    },

    created() {
        this.getUserData();
    },
    methods: {
        editUserData() {
            this.isEditing = !this.isEditing;
        },

        getUserData() {
            // eslint-disable-next-line max-len
            getUserData(this.idToken, this.userId)
                .then((response) => {
                    this.loadedData = true;
                    this.setUserData(response.data);
                });
        },

        setUserData(user) {
            [this.user] = user;
        },

        updateUserData() {
            this.user.address = this.address;
            this.user.email = this.email;
            this.user.number = this.number;
            this.user.info = this.info;

            if (this.file) {
                const formData = new FormData();
                formData.append('files', this.file);
                this.saveNewProfilePicture(formData);
            } else {
                this.saveUserData(this.user);
            }
            this.buttonValue = 'Редактировать';
            this.$router.go();
        },

        saveNewProfilePicture(formData) {
            saveNewProfilePicture(this.idToken, formData)
                .then((response) => {
                    const pictureId = response.data[0].id;
                    this.user.image = pictureId;
                    this.saveUserData(this.user);
                });
        },

        saveUserData(user) {
            // eslint-disable-next-line max-len
            saveUserData(this.idToken, this.userId, user);
        },

        handleFileUpload(event) {
            [this.file] = event.target.files;
        },

    },
};
</script>

<style>
    .user-profile {
        display: flex;
        flex-wrap: wrap;
    }

    .user-profile__input {
        width: 100%;
        border: 1.5px solid #d1cece;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 0;

    }

    .user-profile__input:disabled {
        background-color: transparent;
        color: inherit;
        border: 1px solid #ffffff;
        border-bottom: 1px solid #d1cece;
    }

    .user-profile__input:last-child {
        margin-bottom: 30px;
    }

    .user-profile label {
        color: #969696;
        font-size: 12px;
    }

</style>
