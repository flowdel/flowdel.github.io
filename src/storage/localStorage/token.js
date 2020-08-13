const ACCESS_TOKEN_KEY = 'idToken';

export async function setIdToken(str) {
    return localStorage.setItem(ACCESS_TOKEN_KEY, str);
}

export async function getIdToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function removeIdToken() {
    return localStorage.removeItem(ACCESS_TOKEN_KEY);
}
