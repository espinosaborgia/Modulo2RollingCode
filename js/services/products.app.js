import { SetItem, GetItem } from "./local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";

//#region  Get User (R - Read - Leer)
function getProducts() {
  return GetItem(LOCAL_STORAGE_KEYS.product);
}
//#endregion
function createProduct(
  name,
  description,
  price,
  picture,
  distributor,
  quantity,
  category)
 {
  
  let products = getArrayAndReplace({
    id: crypto.randomUUID(), // Ensure you have a function to generate unique IDs
    name,
    description,
    price,
    picture,
    distributor,
    quantity,
    category,
  });
  // Guardamos el array en el local storage
  SetItem(LOCAL_STORAGE_KEYS.product, products);
}
//#region  Add User (A - Alta)

function getArrayAndReplace(newProduct) {
  let products = getProducts();

  if (products === null) {
    products = [];
  }

  products.push(newProduct);

  return products;
}

function updateProduct(
  id,
  name,
  description,
  price,
  picture,
  distributor,
  quantity,
  category,)
  {
  const products = getProducts();
  if (products !== null && products.length > 0) {
    let index = products.findIndex(function (product) {
      return product.id === id;
    });
    let product = products[index];
    product.name = name;
    product.description = description;
    product.price = price;
    product.picture = picture;
    product.distributor = distributor;
    product.quantity = quantity;
    product.category = category;
    products[index] = product;
    SetItem(LOCAL_STORAGE_KEYS.product, products);
  }
}

function deleteProduct(id) {
  const products = getProducts();

  if (products !== null && products.length > 0) {
    let newProductsArray = products.filter(function (product) {
      return product.id !== id;
    });

    SetItem(LOCAL_STORAGE_KEYS.product, newProductsArray);
  }
}

function getProductsById(id) {
  const products = getProducts();
  return products.find((product) => product.id === id);
}

//#endregion
export {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsById,
};
