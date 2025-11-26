import type {Product} from "./types.mts"

const baseUrl = import.meta.env.PUBLIC_SERVER_URL;
function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProducts(category = "tents") {
  const res= await fetch(baseUrl +`products?category=${category}`)
  const data = await convertToJson(res)
  
  return data

}

export async function findProductById(id:string) {
  const res = await fetch(baseUrl + `products/${id}`);
  const product = await convertToJson(res);
  console.log(product);
  return product;
}
