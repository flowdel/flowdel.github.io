import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function signin(authData) {
    return axios.post('auth/local', {
        identifier: authData.email,
        password: authData.password,
    });
}
