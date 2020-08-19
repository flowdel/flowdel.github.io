import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function removeProduct(product, idToken) {
    return axios.put(`products/${product.id}`, product, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
