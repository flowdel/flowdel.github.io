import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function saveUserData(idToken, userId, user) {
    return axios.put(`users/${userId}`, user, {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
