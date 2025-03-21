import { findProductById } from "./productData.mts";
import { setLocalStorage } from "./utils.mts";
import type { Product } from "./types.mts";

let product:Product;

export default async function productDetails(productId:string, selector:string) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  const el = document.querySelector(selector);
  if(el){
  el.insertAdjacentHTML("afterbegin", productDetailsTemplate(product));
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart")?.addEventListener("click", addToCart);
  }
}

function addToCart() {
  setLocalStorage("so-cart", product);
}

function productDetailsTemplate(product:Product) {
  return `<h3>${product.brand.name}</h3>
  <h2 class="divider">${product.nameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.image}"
    alt="${product.name}"
  />
  <p class="product-card__price">$${product.finalPrice}</p>
  <p class="product__color">${product.colors[0].colorName}</p>
  <p class="product__description">
  ${product.descriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.id}">Add to Cart</button>
  </div>`;
}
