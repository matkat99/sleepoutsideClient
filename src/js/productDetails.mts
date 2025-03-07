import { findProductById } from "./productData.mts";
import { setLocalStorage } from "./utils.mts";
import type { Product } from "./types.mts";

let product:Product;

export default async function productDetails(productId:string, selector:string) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  try {
    product = await findProductById(productId);
    // once we have the product details we can render out the HTML
    const el = document.querySelector(selector);
    if(el){
    el.insertAdjacentHTML("afterbegin", productDetailsTemplate(product));
    // once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById("addToCart")?.addEventListener("click", addToCart);
    }
  } catch (error) {
    console.error(error);
  }
}

function addToCart() {
  setLocalStorage("so-cart", product);
}

function productDetailsTemplate(product:Product) {
  return `<h3>${product.Brand.Name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src="${product.Images.PrimaryLarge}"
    alt="${product.Name}"
  />
  <p class="product-card__price">$${product.FinalPrice}</p>
  <p class="product__color">${product.Colors[0].ColorName}</p>
  <p class="product__description">
  ${product.DescriptionHtmlSimple}
  </p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}
