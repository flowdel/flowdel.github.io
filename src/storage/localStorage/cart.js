const CART = 'cart';

export async function setCart(str) {
    return localStorage.setItem(CART, str);
}

export async function getCart() {
    return localStorage.getItem(CART);
}

export async function removeCart() {
    return localStorage.removeItem(CART);
}
