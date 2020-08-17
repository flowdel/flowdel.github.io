import Vue from 'vue';
import VueRouter from 'vue-router';

import WelcomePage from './components/welcome/WelcomePage.vue';
import SigninPage from './components/auth/Signin.vue';
import SignupPage from './components/auth/Signup.vue';
import Products from './components/product/Products.vue';
import ProductDetails from './components/product/ProductDetails.vue';
import NewProduct from './components/product/NewProduct.vue';
import Cart from './components/cart/Cart.vue';
import UserProfile from './components/user/UserProfile.vue';
import CookerProfile from './components/cooker/CookerProfile.vue';
import Confirm from './components/Confirm.vue';
import { getIdToken, getUserId } from './storage';
import store from './store/store';

Vue.use(VueRouter);

async function guard(to, from, next) {
    let isAuthenticated = false;
    const idToken = await getIdToken();
    const userId = await getUserId();

    if (idToken && userId) {
        isAuthenticated = true;
    }

    if (to.path === '/' || to.path === '/signin' || to.path === '/signup') {
        if (isAuthenticated) {
            await store.dispatch('tryAutoLogin', {
                idToken,
                userId,
            });
            next('/products');
        } else {
            next();
        }
    } else if (isAuthenticated) {
        await store.dispatch('tryAutoLogin', {
            idToken,
            userId,
        });
        next();
    } else {
        next('/signin');
    }
}

const routes = [
    { path: '/', component: WelcomePage },
    { path: '/signin', component: SigninPage, beforeEnter: guard },
    { path: '/signup', component: SignupPage, beforeEnter: guard },
    {
        path: '/settings',
        name: 'UserProfile',
        component: UserProfile,
        props: true,
        beforeEnter: guard,
    },
    {
        path: '/profile/:id',
        name: 'CookerProfile',
        component: CookerProfile,
        props: true,
        beforeEnter: guard,
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        beforeEnter: guard,
    },
    {
        path: '/products/:id',
        name: 'ProductDetails',
        component: ProductDetails,
        props: true,
        beforeEnter: guard,
    },
    {
        path: '/cart',
        component: Cart,
        beforeEnter: guard,
    },
    {
        path: '/new-product',
        component: NewProduct,
        beforeEnter: guard,
    },
    {
        path: '/confirm',
        component: Confirm,
        beforeEnter: guard,
    },
    { path: '*', redirect: '/' },
];

export default new VueRouter({ mode: 'history', routes });
