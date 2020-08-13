import axios from '../../../axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function fetchProducts(idToken) {
    return axios.get('products', {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
