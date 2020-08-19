<template>
    <div class="container">
        <div class="spacer" />
        <div class="headline">
            Новое блюдо
        </div>
        <form
            ref="uploadForm"
            action=""
            class="new-product"
        >
            <label
                for="new-product__name"
            >Название:</label>
            <input
                id="new-product__name"
                v-model="name"
                class="new-product__input"
                type="text"
                @blur="$v.name.$touch()"
            >
            <p
                v-if="$v.name.$anyError"
                class="error-message"
            >
                Имя является обязательной строкой!
            </p>
            <label
                for="new-product__price"
                class="error-message"
            >Цена:</label>
            <input
                id="new-product__price"
                v-model="price"
                class="new-product__input"
                type="text"
                @blur="$v.price.$touch()"
            >
            <p
                v-if="$v.price.$anyError"
                class="error-message"
            >
                Пожалуйста, введите число!
            </p>
            <label for="file">Загрузите фото блюда:</label>
            <div>
                <file-upload
                    ref="upload"
                    v-model="files"
                    class="new-product__upload-button"
                    :multiple="true"
                    post-action="/post.method"
                    put-action="/put.method"
                    @input-filter="inputFilter"
                >
                    <i class="fa fa-plus" />
                    Выберите файлы
                </file-upload>
            </div>

            <div
                v-if="files.length > 0"
                class="new-product__upload-list"
            >
                Загруженные файлы:
                <ul>
                    <li
                        v-for="file in files"
                        :key="file.id"
                    >
                        <span>{{ file.name }}</span>
                    </li>
                </ul>
            </div>

            <p
                v-if="$v.file.$anyError"
                class="error-message"
            >
                Пожалуйста, прикрепите фото блюда!
            </p>
            <label for="new-product__info">Описание:</label>
            <input
                id="new-product__info"
                v-model="description"
                class="new-product__input"
                type="text"
            >
            <label for="new-product__payment-method">Предпочитаемый способ оплаты:</label>
            <select
                id="new-product__payment-method"
                v-model="chosenPaymentMethod"
                @blur="$v.chosenPaymentMethod.$touch()"
            >
                <option>Перевод на карту</option>
                <option>Наличными</option>
            </select>
            <p
                v-if="$v.chosenPaymentMethod.$anyError"
                class="error-message"
            >
                Пожалуйста, выберите способ оплаты.
            </p>
            <label for="new-product__delivery">Доставка:</label>
            <select
                id="new-product__delivery"
                v-model="chosenDeliveryMethod"
                @blur="$v.chosenDeliveryMethod.$touch()"
            >
                <option>На дом</option>
                <option>Забрать у меня</option>
            </select>
            <p
                v-if="$v.chosenDeliveryMethod.$anyError"
                class="error-message"
            >
                Пожалуйста, выберите способ доставки.
            </p>
            <label>Для веганов:</label>
            <div class="new-product__vegan">
                <div>
                    <input
                        id="yes"
                        v-model="vegan"
                        type="radio"
                        value="true"
                        @blur="$v.vegan.$touch()"
                    >
                    <label for="yes">Да</label>
                    <p
                        v-if="$v.vegan.$anyError"
                        class="error-message"
                    >
                        Пожалуйста, укажите, подходит ли блюдо для веганов!
                    </p>
                </div>
                <div>
                    <input
                        id="no"
                        v-model="vegan"
                        type="radio"
                        value="false"
                    >
                    <label for="no">Нет</label>
                </div>
            </div>
        </form>
        <div class="spacer" />
        <app-button
            @click.native="saveProduct"
        >
            Сохранить
        </app-button>
    </div>
</template>

<script>
import {
    required, numeric,
} from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import { saveNewProduct, saveNewPicture } from '@/services';
import Button from '../Button.vue';

export default {
    components: {
        appButton: Button,
    },
    data() {
        return {
            name: '',
            description: '',
            price: null,
            chosenPaymentMethod: '',
            chosenDeliveryMethod: '',
            vegan: null,
            files: [],
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
        }),
        delivery() {
            return this.chosenDeliveryMethod === 'На дом' ? 'deliveryToHome' : 'pickUp';
        },
        paymentMethod() {
            return this.chosenPaymentMethod === 'Наличные' ? 'cash' : 'card';
        },
    },
    methods: {
        saveProduct() {
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
                formData.append('files', file.file, file.file.name);
            }

            saveNewPicture(formData, this.$store.state.authorization.idToken)
                .then((response) => {
                    const pictures = response.data;
                    const pictureIds = [];
                    // eslint-disable-next-line no-restricted-syntax
                    for (const picture of pictures) {
                        pictureIds.push(picture.id);
                    }
                    newProduct.image = pictureIds;
                    saveNewProduct(newProduct, this.$store.state.authorization.idToken)
                        .then((res) => {
                            const productId = res.data.id;
                            this.$router.replace(`/products/${productId}`);
                        });
                });
        },

        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                    prevent();
                    return;
                }
            }
            // eslint-disable-next-line no-param-reassign
            newFile.blob = '';
            const URL = window.URL || window.webkitURL;
            if (URL && URL.createObjectURL) {
                // eslint-disable-next-line no-param-reassign
                newFile.blob = URL.createObjectURL(newFile.file);
            }
        },
    },
};
</script>

<style>
    .new-product {
        display: flex;
        flex-wrap: wrap;
    }

    .new-product__input {
        width: 100%;
        border: 1px solid #d1cece;
        padding: 10px 0;
        margin-bottom: 5px;
        border-radius: 0;
        font-size: 14px;
    }

    .new-product__input:last-child {
        margin-bottom: 30px;
    }

    .new-product label {
        width: 100%;
        color: #969696;
        font-size: 12px;
        margin-bottom: 8px;
    }

    .new-product select {
        font-size: 14px;
        margin-bottom: 8px;
    }

    /* .new-product__vegan {
        display: flex;
        flex-direction: column;
        text-align: left;
    } */

    .new-product__vegan label {
        color: inherit;
        font-size: 14px;
    }

    .new-product__upload-button {
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #d1cece;
        font-size: 14px;
        margin-bottom: 5px;
        padding: 5px;
    }

    .new-product__upload-button:hover {
        background-color: rgb(233, 230, 230);
    }

    .new-product__upload-list {
        color: #969696;
        font-size: 12px;
        width: 100%;
    }

    .new-product__upload-list li {
        font-size: 14px;
        color: #333131;
    }

    .error-message {
        font-size: 14px;
        color: red
    }

    select {
        border: 1px solid #d1cece;
    }

</style>
