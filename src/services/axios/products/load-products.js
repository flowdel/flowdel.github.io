import axios from '../../../axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function loadProducts(idToken, start) {
    return axios.get(`products?_sort=createdAt:DESC&_start=${start}&_limit=10`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
