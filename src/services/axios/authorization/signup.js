import axios from '@/axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function signup(authData) {
    return axios.post('auth/local/register', {
        username: authData.login,
        email: authData.email,
        password: authData.password,
        name: authData.name,
    });
}
