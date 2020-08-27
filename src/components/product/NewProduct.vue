<template>
    <v-container
        fluid
        px-4
        py-0
    >
        <div class="spacer" />
        <div class="headline">
            Новое блюдо
        </div>
        <v-form
            ref="uploadForm"
            lazy-validation
            color="amber"
        >
            <div
                class="form-group"
            >
                <v-text-field
                    v-model="name"
                    label="Название"
                    :error-messages="nameErrors"
                    @blur="$v.name.$touch()"
                    @input="$v.name.$touch()"
                />
            </div>
            <div
                class="form-group"
            >
                <v-text-field
                    v-model="price"
                    label="Цена"
                    :error-messages="priceErrors"
                    @blur="$v.price.$touch()"
                    @input="$v.price.$touch()"
                />
            </div>

            <div
                class="form-group"
            >
                <v-file-input
                    ref="upload"
                    v-model="files"
                    multiple
                    accept="image/*"
                    label="Выберите файлы"
                    prepend-icon="mdi-camera"
                />
            </div>

            <div
                class="form-group"
            >
                <v-text-field
                    v-model="description"
                    label="Описание"
                />
            </div>

            <v-select
                v-model="chosenPaymentMethod"
                :items="paymentMethods"
                label="Метод оплаты"
                :error-messages="paymentErrors"
                @blur="$v.chosenPaymentMethod.$touch()"
                @input="$v.chosenPaymentMethod.$touch()"
            />

            <v-select
                v-model="chosenDeliveryMethod"
                :items="deliveryMethods"
                label="Метод доставки"
                :error-messages="deliveryErrors"
                @blur="$v.chosenDeliveryMethod.$touch()"
                @input="$v.chosenDeliveryMethod.$touch()"
            />

            <v-switch
                v-model="vegan"
                label="Для веганов"
            />

            <div class="spacer" />
            <v-btn
                color="primary"
                dark
                width="280"
                @click="saveProduct"
            >
                Сохранить
            </v-btn>
            <div class="spacer" />
        </v-form>

        <div class="spacer" />
    </v-container>
</template>

<script>
import {
    required, numeric,
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { saveNewProduct, saveNewPicture } from '@/services';

export default {
    data() {
        return {
            name: '',
            description: '',
            price: null,
            chosenPaymentMethod: '',
            chosenDeliveryMethod: '',
            vegan: null,
            files: [],
            paymentMethods: [
                'Перевод на карту',
                'Наличными',
            ],
            deliveryMethods: [
                'Забрать у меня',
                'Доставлю на дом',
            ],
        };
    },
    validations: {
        name: {
            required,
        },
        price: {
            required,
            numeric,
        },
        file: {
            required,
        },
        chosenPaymentMethod: {
            required,
        },
        chosenDeliveryMethod: {
            required,
        },
        vegan: {
            required,
        },

    },
    computed: {
        ...mapState({
            author: (state) => state.authorization.userId,
            idToken: (state) => state.authorization.idToken,
        }),
        delivery() {
            return this.chosenDeliveryMethod === 'Доставлю на дом' ? 'deliveryToHome' : 'pickUp';
        },
        paymentMethod() {
            return this.chosenPaymentMethod === 'Наличными' ? 'cash' : 'card';
        },
        nameErrors() {
            let error = '';
            if (!this.$v.name.$dirty) return error;
            if (!this.$v.name.required) {
                error = 'Введите имя';
            }
            return error;
        },
        priceErrors() {
            let error = '';
            if (!this.$v.price.$dirty) return error;
            if (!this.$v.price.required) {
                error = 'Введите цену';
            } else if (!this.$v.price.numeric) {
                error = 'Цена должна быть числом';
            }
            return error;
        },
        paymentErrors() {
            let error = '';
            if (!this.$v.chosenPaymentMethod.$dirty) return error;
            if (!this.$v.chosenPaymentMethod.required) {
                error = 'Выберите способ оплаты';
            }
            return error;
        },
        deliveryErrors() {
            let error = '';
            if (!this.$v.chosenDeliveryMethod.$dirty) return error;
            if (!this.$v.chosenDeliveryMethod.required) {
                error = 'Выберите способ доставки';
            }
            return error;
        },

    },
    methods: {
        saveProduct() {
            console.log(this.files);
            const newProduct = {
                name: this.name,
                description: this.description,
                price: this.price,
                paymentMethod: this.paymentMethod,
                delivery: this.delivery,
                vegan: this.vegan,
                author: this.author,
                active: true,
            };

            const formData = new FormData();

            // eslint-disable-next-line no-restricted-syntax
            for (const file of this.files) {
                formData.append('files', file, file.name);
            }

            saveNewPicture(formData, this.idToken)
                .then((response) => {
                    const pictures = response.data;
                    const pictureIds = [];
                    // eslint-disable-next-line no-restricted-syntax
                    for (const picture of pictures) {
                        pictureIds.push(picture.id);
                    }
                    newProduct.image = pictureIds;
                    saveNewProduct(newProduct, this.idToken)
                        .then((res) => {
                            const productId = res.data.id;
                            this.$router.replace(`/products/${productId}`);
                        });
                });
        },
    },
};
</script>

<style>
</style>
