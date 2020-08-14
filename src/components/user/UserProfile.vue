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
                v-model="name"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >
            <label for="user-profile__address">Адрес:</label>
            <input
                id="user-profile__address"
                v-model="address"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >
            <label for="user-profile__email">Почта:</label>
            <input
                id="user-profile__email"
                v-model="email"
                class="user-profile__input"
                type="email"
                :disabled="!isEditing"
            >
            <label for="user-profile__number">Телефон:</label>
            <input
                id="user-profile__number"
                v-model="number"
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
                v-model="info"
                class="user-profile__input"
                type="text"
                :disabled="!isEditing"
            >
        </form>
        <app-button
            v-if="!isEditing"
            value="Редактировать"
            @click.native="editUserData"
        />
        <app-button
            v-else
            value="Сохранить"
            @click.native="updateUserData"
        />
    </div>
</template>

<script>
import Button from '../Button.vue';
import { getUserData, saveNewProfilePicture, saveUserData } from '../../services';

export default {

    components: {
        appButton: Button,
    },
    data() {
        return {
            user: null,
            name: '',
            address: '',
            email: '',
            number: '',
            info: '',
            isEditing: false,
            file: null,
        };
    },

    methods: {

        editUserData() {
            this.isEditing = !this.isEditing;
        },

        getUserData() {
            // eslint-disable-next-line max-len
            getUserData(this.$store.state.authorization.idToken)
                .then((response) => {
                    const user = response.data;
                    this.setUserData(user);
                })
                .catch((error) => console.log(error));
        },

        setUserData(user) {
            this.user = user;
            this.name = user.name;
            this.address = user.address;
            this.email = user.email;
            this.number = user.number;
            this.info = user.info;
        },

        updateUserData() {
            this.user.name = this.name;
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
        },

        saveNewProfilePicture(formData) {
            saveNewProfilePicture(this.$store.state.authorization.idToken, formData)
                .then((response) => {
                    const pictureId = response.data[0].id;
                    this.user.image = pictureId;
                    this.saveUserData(this.user);
                })
                .catch((error) => console.log(error));
        },

        saveUserData(user) {
            // eslint-disable-next-line max-len
            saveUserData(this.$store.state.authorization.idToken, this.$store.state.authorization.userId, user)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => console.log(error));
        },

        handleFileUpload(event) {
            [this.file] = event.target.files;
        },

    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.getUserData();
        });
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
