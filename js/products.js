import { getProducts } from "./services/products.app.js";

const products = getProducts();
const divContainer = document.getElementById("card-container");

{
  /*  */
}

if (products) {
  console.log(products);
  refresh();
}

function refresh() {
  let htmlString = "";
  divContainer.innerHtml = "";

  products.forEach((product) => {
    htmlString += getHtmlCard(
      product.picture,
      product.id,
      product.name,
      product.description,
      product.price,
      product.distributor,
      product.quantity,
      product.category,
    );
  });

  divContainer.innerHTML = htmlString;
}

function getHtmlCard(picture,id, name, description,price,distributor,quantity,category) {
  return `<div class="card" style="width: 18rem;">
  <img src="${picture}" class="card-img-top" alt="no-image">
  <div class="card-body">
    <a href="./products_id.html?id=${id}" class="btn btn-dark">Detalle</a>
    <h5 class="card-title">${name}</h5>
    <p class="card-text">${description}</p>
    <p class="card-text">${price}</p>
    <p class="card-text">${distributor}</p>
    <p class="card-text">${quantity}</p>
    <p class="card-text">${category}</p>
  </div>
</div>`;
}
