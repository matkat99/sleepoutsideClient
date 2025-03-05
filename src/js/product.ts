import type {Product} from "./types.mjs"
import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./ProductData.mjs";

function addProductToCart(product:Product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e:Event) {
  const target = e.target as HTMLButtonElement
  const product = await findProductById(target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  ?.addEventListener("click", addToCartHandler);
