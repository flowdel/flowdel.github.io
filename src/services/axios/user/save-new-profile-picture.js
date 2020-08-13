import axios from '../../../axios-database';

// eslint-disable-next-line import/prefer-default-export
export async function saveNewProfilePicture(idToken, formData) {
    return axios.post('upload', formData, {
        headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
}
