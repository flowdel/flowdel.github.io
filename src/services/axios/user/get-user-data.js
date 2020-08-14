import axios from '../../../axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function getUserData(idToken) {
    return axios.get('users/me', {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });
}
