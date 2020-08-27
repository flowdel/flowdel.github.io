<template>
    <v-container
        fluid
        px-4
        py-0
    >
        <v-form>
            <div class="headline">
                Профиль
            </div>
            <v-text-field
                v-model="user.name"
                label="Имя:"
                :disabled="!isEditing"
            />
            <v-text-field
                v-model="user.address"
                label="Адрес:"
                :disabled="!isEditing"
            />
            <v-text-field
                v-model="user.email"
                label="E-mail:"
                :disabled="!isEditing"
            />
            <v-text-field
                v-model="user.number"
                label="Телефон:"
                :disabled="!isEditing"
            />
            <v-file-input
                ref="upload"
                v-model="file"
                accept="image/*"
                label="Фото профиля:"
                prepend-icon="mdi-camera"
                :disabled="!isEditing"
            />
            <v-text-field
                v-model="user.info"
                label="О себе:"
                :disabled="!isEditing"
            />

            <div class="spacer" />

            <v-btn
                v-if="!isEditing"
                color="primary"
                dark
                width="280"
                @click="editUserData"
            >
                Редактировать
            </v-btn>
            <v-btn
                v-else
                color="primary"
                outlined
                dark
                width="280"
                @click="updateUserData"
            >
                Сохранить
            </v-btn>
            <div class="spacer" />
        </v-form>
        <app-loading v-if="!loadedData" />
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { getUserData, saveNewProfilePicture, saveUserData } from '@/services';
import Loading from '../LoadingIndicator.vue';

export default {

    components: {
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
