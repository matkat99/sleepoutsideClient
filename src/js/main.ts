import { openUserMenu } from "./utils.mjs";
import { mount } from "svelte";
import UserMenu from './components/UserMenu.svelte';
import { checkAuth } from "./auth.svelte";

checkAuth();

const menuEl = document.querySelector('.user-menu-container');
if(menuEl) {
    mount(UserMenu, {
        target: menuEl
    });
}

// openUserMenu(".user__button");
