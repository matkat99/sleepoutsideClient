import { mount } from "svelte";
import UserMenu from './components/UserMenu.svelte';
import Profile from './components/Profile.svelte';


const menuEl = document.querySelector('.user-menu-container');
if(menuEl) {
    mount(UserMenu, {
        target: menuEl
    });
}

const contentEl = document.querySelector('.content');

if(contentEl) {
    mount(Profile, {
        target: contentEl
    });
}