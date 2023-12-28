import { getUsers } from "./services/user.app.js";
import { GetItem } from "../js/services/local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "./configurations/keys.config.js";
import { ROLES_VALUES,INITIAL_ROLES } from "./configurations/seed.js";

const userLogged = GetItem(LOCAL_STORAGE_KEYS.activeUser);

if ((userLogged && userLogged.rol.id !== ROLES_VALUES.ADMIN) || !userLogged) {
  window.location.href = "/";
}

//#region HTML  References
const usersTable = document.getElementById("users-table");
const productsTable = document.getElementById("products-table");
const deleteProductBtn = document.getElementById("deleteProduct");


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
refresh(refreshUsers);
//#endregion Init Data

//#region Functions
function refresh(callback) {
  callback();
}

//----------------Users---------------------

document.addEventListener("DOMContentLoaded", function () {
  const addUserForm = document.getElementById("userAdd");

  if (addUserForm) {
    addUserForm.addEventListener("submit", function (e) {
  // Evitar el comportamiento predeterminado del formulario

      const userRolSelect = document.getElementById("createRol");
      const selectedOption = userRolSelect.options[userRolSelect.selectedIndex];
      const selectedRoleId = selectedOption.value;

      // Obtener los valores del formulario
      const _createUsername = document.getElementById("createUsername").value;
      const _createPass = document.getElementById("createPass").value;
      const _createRePass = document.getElementById("createRePass").value;
      const _createName = document.getElementById("createName").value;
      const _createLastname = document.getElementById("createLastname").value;
      const _createDirection = document.getElementById("createDirection").value;
      const _createTel = document.getElementById("createTel").value;

  
      if (_createPass === _createRePass) {
        
        if (selectedRoleId === "ADMIN") {
          if (!createUser(_createUsername, _createPass, _createName, _createLastname , INITIAL_ROLES.find((rol) => rol.id === 2), _createDirection, _createTel)) {
       
          }
        } else {
          createUserRolCommon(_createUsername, _createPass, _createName, _createLastname, _createDirection, _createTel);
        }
      } else {
        alert("Las contraseñas no coinciden");
      }
    });
  }
});
//---------------functions users--------------

function refreshUsers() {
  usersTable.innerHTML = "";

  data.Users = getUsers();

  if (data.Users) {
    data.Users.forEach((user) => {
      let tr = document.createElement("tr");
      let tdUsername = document.createElement("td");
      let tdName = document.createElement("td");
      let tdLastname = document.createElement("td");
      let tdRol = document.createElement("td");
      let tdDirection = document.createElement("td");
      let tdTel = document.createElement("td");
      let tdActions = document.createElement("td");

      tdActions.id =user.username;
      tdUsername.innerText = user.username;
      tdName.innerText = user.name;
      tdLastname.innerText = user.lastname;
      if(user.rol.id==2){
        tdRol.innerText= 'Administrador';}
        else if(user.rol.id==1){
          tdRol.innerText='Cliente';
        }
      else{
        tdRol.innerText="";

      }
      tdDirection.innerText = user.direction;
      tdTel.innerText = user.tel;
      tdActions.innerHTML = `<a id='${user.username}' href='#' style='color: black;' data-bs-toggle="modal" data-bs-target="#adminUserModal">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                <path d="M16 5l3 3" /></svg>
                            </a>`;

      tr.appendChild(tdUsername);
      tr.appendChild(tdName);
      tr.appendChild(tdLastname);
      tr.appendChild(tdRol);
      tr.appendChild(tdDirection);
      tr.appendChild(tdTel);
      tr.appendChild(tdActions);
      usersTable.appendChild(tr);
    });

   
    data.Users.forEach((user) => {
      const btnUserModify = document.getElementById(user.username);
    
      if (btnUserModify) {
        btnUserModify.addEventListener("click", (e) => {
         
         
          currents.user = getUserByUsername(e.target.parentElement.id);
    
          if (currents.user.username) {
            updateUsername.value = currents.user.username;
            updateName.value = currents.user.name;
            updateLastname.value = currents.user.lastname;
            updateRol.value=currents.user.rol.id; 
            updateDirection.value = currents.user.direction;
            updateTel.value = currents.user.tel;
            // Asigna otras propiedades de usuario a campos correspondientes del formulario
          } else {
            updateUsername.value = "";
            updateName.value = "";
            updateLastname.value = "";
            updateRol.value = ""; // Limpia el campo de selección del rol
            updateDirection.value = "";
            updateTel.value = "";
            // Limpia otros campos del formulario si no hay usuario seleccionado
          }
        });
      }
    });
    
    
  }
};

// ...

updateUserForm.addEventListener("submit", (e) => {

  if (currents.user) {
    let newUsername = updateUsername.value;
    let newPass = updatePass.value;
    let newName = updateName.value;
    let newLastname = updateLastname.value;
    const userRolSelect = document.getElementById("updateRol");
      const selectedOption = userRolSelect.options[userRolSelect.selectedIndex];
      let newRol = selectedOption.value;
    let newDirection = updateDirection.value;
    let newTel = updateTel.value;

    updateUser(
      
      newUsername,
      newPass,
      newName,
      newLastname,
      newRol,
      newDirection,
      newTel
    );
  }
});

// ...


//#endregion Functions
