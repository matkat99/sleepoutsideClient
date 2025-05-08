import { mount } from "svelte";
import CheckoutForm from "./components/CheckoutForm.svelte";
import { checkAuth } from "./auth.svelte";

checkAuth();
const checkoutEl = document.querySelector(".checkout-container");

if(checkoutEl) {
const checkout = mount(CheckoutForm, {
  target: checkoutEl,
  props: {
    key: "so-cart",
  },
});
}