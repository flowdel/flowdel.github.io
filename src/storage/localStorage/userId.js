const USER_ID_KEY = 'userId';

export async function setUserId(value) {
    localStorage.setItem(USER_ID_KEY, value);
}

export async function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}

export async function removeUserId() {
    localStorage.removeItem(USER_ID_KEY);
}
