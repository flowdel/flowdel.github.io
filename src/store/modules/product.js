import {
    saveNewProduct, saveNewPicture, fetchProducts, removeProduct,
} from '../../services';

const state = {
    products: [],
};

const mutations = {
    saveProducts($state, products) {
        // eslint-disable-next-line no-param-reassign
        $state.products = products;
    },
};

const actions = {

    saveNewProduct({ commit, rootState }, product) {
        saveNewProduct(product, rootState.authorization.idToken)
            .then((response) => {
                console.log(response);
                commit('doSmth');
            })
            .catch((error) => console.log(error));
    },

    saveNewPicture({ dispatch, rootState }, payload) {
        saveNewPicture(payload.formData, rootState.authorization.idToken)
            .then((response) => {
                const pictureId = response.data[0].id;
                // eslint-disable-next-line no-param-reassign
                payload.newProduct.image = pictureId;
                dispatch('saveNewProduct', payload.newProduct);
            })
            .catch((error) => console.log(error));
    },

    fetchProducts({ commit, rootState }) {
        fetchProducts(rootState.authorization.idToken)
            .then((response) => {
                const allProducts = response.data;
                const products = allProducts.filter((product) => product.active === true);
                commit('saveProducts', products);
            })
            .catch((error) => console.log(error));
    },

    removeProduct({ rootState }, product) {
        // eslint-disable-next-line no-param-reassign
        product.active = false;
        removeProduct(rootState.authorization.idToken, product)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    },

};

const getters = {
    productList($state) {
        return $state.products;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
