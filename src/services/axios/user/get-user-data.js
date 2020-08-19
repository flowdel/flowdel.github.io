import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function getUserData(idToken, userId) {
    return axios.get(`users?id=${userId}`, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
