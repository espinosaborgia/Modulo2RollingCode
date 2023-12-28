import { getProductsById } from "./services/products.app.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const detail = document.getElementById("detail");

if (id === null) {
  window.location.href = "/";
}

const products = getProductsById(id);

detail.innerHTML = getProductsData();

function getProductsData() {
  return `<div class="card mb-3">
    <img src="${products.picture}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${products.name}</h5>
      <p class="card-text">${products.description}</p>
      <p class="card-text">${products.price}</p>
      <p class="card-text">${products.picture}</p>
      <p class="card-text">${products.distributor}</p>
      <p class="card-text">${products.quantity}</p>
      <p class="card-text">${products.category}</p>
    </div>
  </div>`;
}
