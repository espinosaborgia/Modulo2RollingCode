
import {
  createProduct,
  deleteProduct,
  getProductsById,
  updateProduct,
  getProducts,
} from "./services/products.app.js";
import { GetItem } from "./services/local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "./configurations/keys.config.js";
import { ROLES_VALUES,INITIAL_ROLES } from "./configurations/seed.js";

const userLogged = GetItem(LOCAL_STORAGE_KEYS.activeUser);

if ((userLogged && userLogged.rol.id !== ROLES_VALUES.ADMIN) || !userLogged) {
  window.location.href = "/";
}

//#region HTML  References
const productsTable = document.getElementById("products-table");
const deleteProductBtn = document.getElementById("deleteProduct");




//#region  Create

const createNameProduct = document.getElementById("createNameProduct");
const createDescription = document.getElementById("createDescription");
const createPrice = document.getElementById("createPrice");
const createPicture = document.getElementById("createPicture");
const createDistributor = document.getElementById("createDistributor");
const createQuantity = document.getElementById("createQuantity");
const createCategory = document.getElementById("createCategory");

let _createNameProduct =createNameProduct.value,
  _createDescription=createDescription.value,
  _createPrice=createPrice.value,
  _createPicture=createPicture.value,
  _createDistributor=createDistributor.value,
  _createQuantity=createQuantity.value,
  _createCategory=createCategory.value;
//#endregion

//#region  Update
const updateProductBtn = document.getElementById("updateProduct");
const updateName = document.getElementById("name");
const updateDescription = document.getElementById("description");
const updatePrice = document.getElementById("price");
const updatePicture = document.getElementById("picture");
const updateDistributor = document.getElementById("distributor");
const updateQuantity = document.getElementById("quantity");
const updateCategory = document.getElementById("category");
//#endregion

//#endregion HTML References

//#region  Variables

let data = {
  users: [],
  products: [],
};

let currents = {
  product: {},
  user: {},
};

//variables de creacion

//#endregion Variables

//#region  Init Data
refresh(refreshProducts);
//#endregion Init Data

//#region  Events

deleteProductBtn.addEventListener("click", () => {
  deleteProduct(currents.product.id);
  window.location.reload();
});


document.addEventListener("DOMContentLoaded", function () {
  const addProductForm = document.getElementById("productadd");

  if (addProductForm) {
    addProductForm.addEventListener("submit", function (e) {
      // Get the values from the form
      const _createNameProduct = createNameProduct.value;
      const _createDescription = createDescription.value;
      const _createPrice = createPrice.value;
      const _createPicture = createPicture.value;
      const _createDistributor = createDistributor.value;
      const _createQuantity = createQuantity.value;
      const _createCategory = createCategory.value;
      // Perform validation
     
       createProduct(_createNameProduct,_createDescription,_createPrice,_createPicture,_createDistributor,_createQuantity,_createCategory);
     
    });
  }
});


updateProductBtn.addEventListener("click", () => {
  if (currents.product.id) {
    updateProduct(
      currents.product.id,
      updateName.value,
      updateDescription.value,
      updatePrice.value,
      updatePicture.value,
      updateDistributor.value,
      updateQuantity.value, 
      updateCategory.value 
    );
    // Actualizar la interfaz después de la modificación
    refresh(refreshProducts);
  }
  document.getElementById("notUpdate")?.click();
});

//#region Create inptus Events

_createNameProduct.addEventListener("change", (e) => {
  _createNameProduct = e.target.value;
});
createDescription.addEventListener("change", (e) => {
  _createDescription = e.target.value;
});
createPrice.addEventListener("change", (e) => {
  _createPrice = e.target.value;
});
createPicture.addEventListener("change", (e) => {
  _createPicture = e.target.value;
});
createDistributor.addEventListener("change", (e) => {
  _createDistributor = +e.target.value;
});
createQuantity.addEventListener("change", (e) => {
  _createQuantity = +e.target.value;
});
createCategory.addEventListener("change", (e) => {
  _createCategory = +e.target.value;
});
//#endregion Create Inputs Events
//#endregion Events

//#region Functions
function refresh(callback) {
  callback();
}


function refreshProducts() {
  productsTable.innerHTML = "";

  data.products = getProducts();

  if (data.products) {
    data.products.forEach((product) => {
      let tr = document.createElement("tr");
      let tdNameProduct = document.createElement("td");
      let tdDescription = document.createElement("td");
      let tdPrice = document.createElement("td");
      let tdDistributor = document.createElement("td");
      let tdQuantity = document.createElement("td");
      let tdCategory = document.createElement("td");
      let tdActions = document.createElement("td");

      tdActions.id = product.id;
      tdNameProduct.innerText = product.name;
      tdDescription.innerText = product.description;
      tdPrice.innerText = product.price;
      tdDistributor.innerText = product.distributor;
      tdQuantity.innerText = product.quantity;
      tdCategory.innerText = product.category;
      tdActions.innerHTML = `<a id='${product.id}' href='#' style='color: black;' data-bs-toggle="modal" data-bs-target="#adminModal">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                <path d="M16 5l3 3" /></svg>
                            </a>`;

      tr.appendChild(tdNameProduct);
      tr.appendChild(tdDescription);
      tr.appendChild(tdPrice);
      tr.appendChild(tdDistributor);
      tr.appendChild(tdQuantity);
      tr.appendChild(tdCategory);
      tr.appendChild(tdActions);
      productsTable.appendChild(tr);
    });

    data.products.forEach((product) => {
      const btnModify = document.getElementById(product.id);

      if (btnModify) {
        btnModify.addEventListener("click", (e) => {
          console.log(e.target.parentElement.id);
          currents.product = getProductsById(e.target.parentElement.id);

          if (currents.product) {
            updateName.value = currents.product.name;
            updateDescription.value = currents.product.description;
            updatePrice.value = currents.product.price;
            updatePicture.value = currents.product.picture;
            updateDistributor.value = currents.product.distributor;
            updateQuantity.value = currents.product.quantity;
            updateCategory.value = currents.product.category;
          } else {
            updateName.value = "";
            updateDescription.value = "";
            updatePrice.value = "";
            updatePicture.value = "";
            updateDistributor.value = "";
            updateQuantity.value = "";
            updateCategory.value = "";
          }
        });
      }
    });
  }
}

// ...


//#endregion Functions
