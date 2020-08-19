import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export function saveNewProduct(product, idToken) {
    return axios.post('products', product, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
