import axios from '../../../axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function saveNewPicture(formData, idToken) {
    return axios.post('upload', formData, {
        headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}
