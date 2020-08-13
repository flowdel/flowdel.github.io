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
            <label for="new-product__name">Название:</label>
            <input
                id="new-product__name"
                v-model="name"
                class="new-product__input"
                type="text"
            >
            <label for="new-product__price">Цена:</label>
            <input
                id="new-product__price"
                v-model="price"
                class="new-product__input"
                type="text"
            >
            <label for="file">Загрузите фото блюда:</label>
            <input
                id="file"
                class="new-product__input"
                type="file"
                @change="handleFileUpload"
            >
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
            >
                <option>Перевод на карту</option>
                <option>Наличными</option>
            </select>
            <label for="new-product__delivery">Доставка:</label>
            <select
                id="new-product__delivery"
                v-model="chosenDeliveryMethod"
            >
                <option>На дом</option>
                <option>Забрать у меня</option>
            </select>

            <label>Для веганов:</label>
            <div class="new-product__vegan">
                <div>
                    <input
                        id="yes"
                        v-model="vegan"
                        type="radio"
                        value="true"
                    >
                    <label for="yes">Да</label>
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
            :value="value"
            @click.native="saveProduct"
        />
    </div>
</template>

<script>
import Button from '../Button.vue';

export default {
    components: {
        appButton: Button,
    },
    data() {
        return {
            value: 'Сохранить',
            name: '',
            description: '',
            price: null,
            chosenPaymentMethod: '',
            chosenDeliveryMethod: '',
            vegan: false,
            file: '',
        };
    },
    computed: {
        author() {
            return this.$store.state.authorization.userId;
        },
        delivery() {
            return this.chosenDeliveryMethod === 'На дом' ? 'deliveryToHome' : 'pickUp';
        },
        paymentMethod() {
            return this.chosenPaymentMethod === 'Наличные' ? 'cash' : 'card';
        },
    },
    methods: {
        saveProduct() {
            console.log('Продукт сохранен!');
            console.log(this.author);
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
            formData.append('files', this.file);
            this.$store.dispatch('saveNewPicture', {
                formData,
                newProduct,
            });
            this.$router.replace('/products');
        },

        handleFileUpload() {
            [this.file] = this.$refs.uploadForm.file.files;
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

    /* #new-product__img {
        border: 0
    } */

</style>
