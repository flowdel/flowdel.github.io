import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function getUserProducts(userId, idToken, status) {
    return axios.get(`products?author=${userId}&active=${status}`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
