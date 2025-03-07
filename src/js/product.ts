import { getParam } from "./utils.mts";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
if(productId) {
  productDetails(productId, ".product-detail");
}

