import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from './store/store.js';

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
// import { getUserId } from './storage';

Vue.use(VueRouter);

// function guard(to, from, next) {
//     let isAuthenticated = false;
//     if (localStorage.getItem('loggedUser')) isAuthenticated = true;
//     else { isAuthenticated = false; }
//     if (isAuthenticated) {
//         next(); // allow to enter route
//     } else {
//         next('/products'); // go to '/login';
//     }
// }

// async function guard(to, from, next) {
//     const user = await getUserId();
//     if (user) {
//         console.log('All OK');
//         next();
//     } else {
//         console.log('STOP guard');
//         next(false);
//     }
// }

const routes = [
    { path: '/', component: WelcomePage },
    { path: '/signin', component: SigninPage },
    { path: '/signup', component: SignupPage },
    { path: '/settings', component: UserProfile },
    {
        path: '/profile/:id', name: 'CookerProfile', component: CookerProfile, props: true,
    },
    {
        path: '/products',
        name: 'Products',

        component: Products,
    },
    {
        path: '/products/:id', name: 'ProductDetails', component: ProductDetails, props: true,
    },
    { path: '/cart', component: Cart },
    { path: '/new-product', component: NewProduct },
    { path: '/confirm', component: Confirm },
    { path: '*', redirect: '/' },
];

export default new VueRouter({ mode: 'history', routes });
