import { mount } from "svelte";
import ShoppingCart from "./components/ShoppingCart.svelte";

const cartEl = document.querySelector(".cartContainer");

if(cartEl) {
const shoppingCart = mount(ShoppingCart, {
  target: cartEl,
});
}