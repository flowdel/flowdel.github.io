import axios from '../../../axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function getProductData(productId, idToken) {
    return axios.get(`products?id=${productId}`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
