import { mount } from "svelte";
import UserMenu from './components/UserMenu.svelte';
import ProductList from './components/ProductList.svelte';
import { checkAuth } from "./auth.svelte";
import { getParam } from "./utils.mts";

checkAuth();

const category = getParam('category');

const menuEl = document.querySelector('.user-menu-container');
if(menuEl) {
    mount(UserMenu, {
        target: menuEl
    });
}

const productListEl = document.querySelector('.products');
if(productListEl) {
    mount(ProductList, {
        target: productListEl,
        props: { category }
    });
}


