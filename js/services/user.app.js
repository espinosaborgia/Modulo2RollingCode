import { SetItem, GetItem, RemoveItem } from "./local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";
import { ERROR_MESSAGES } from "../configurations/messages.config.js";
import { GetError } from "../helpers/error.helpers.js";
import { INITIAL_ROLES, ROLES_VALUES } from "../configurations/seed.js";

//#region Errores
function GetErrorNotFound() {
  return GetError(ERROR_MESSAGES.not_found);
}

function GetErrorNotMatch() {
  return GetError(ERROR_MESSAGES.not_match);
}
//#endregion

//#region Get Users (R - Read - Leer)
function getUsers() {
  return GetItem(LOCAL_STORAGE_KEYS.user) || [];
}
//#endregion
//#region Validar existencia de usuario
function isUserExist(username) {
  let users = getUsers();
  let userExist = users.find((user) => user.username === username);

  if (userExist) {
    alert(ERROR_MESSAGES.duplicate_username);
    return true;
  }
  return false;
}
function createUser(username, password, name, lastname, rol, direction, tel) {
  if (!isUserExist(username)) {
    const newUser = { username, password, name, lastname, rol, direction, tel };
    let users = getArrayAndReplace(newUser);

    // Guardamos el array en el local storage
    SetItem(LOCAL_STORAGE_KEYS.user, users);
  }
}

function createUserRolCommon(username, password, name, lastname, direction, tel) {
  createUser(
    username,
    password,
    name,
    lastname,
    INITIAL_ROLES.find((rol) => rol.id === ROLES_VALUES.CLIENTE),
    direction,
    tel
  );
}
function updateUser(
 
  username,
   password,
    name, 
    lastname,
     rol,
      direction,
       tel
) {
  const users = getUsers();
  if (users !== null && users.length > 0) {
    let index = users.findIndex(function (user) {
      return user.username === username;
    });
    let user = users[index];
    user.username = username;
    user.password=password;
    user.name = name;
    user.lastname = lastname;
    user.rol = rol;
    user.direction = direction;
    user.tel=tel;
    users[index] = user;
    SetItem(LOCAL_STORAGE_KEYS.user, users);
  }
}

function getUserByUsername(username) {
  const users = getUsers();
  return users.find((user) => user.username === username);
}
function getArrayAndReplace(newUser) {
  // Traer el array del local storage
  let users = getUsers();

  
 

  // Almacenamos el nuevo usuario en el array
  users.push(newUser);

  // Retornamos el array con el usuario agregado
  return users;
}
//#endregion

//#region Login and Logout
function login(username, password) {
  // Verificar si el usuario existe
  // Comparar en la base de datos si existe un
  // usuario con el mismo username y la misma contraseña
  let users = getUsers();

  if (!Array.isArray(users)) {
    return GetErrorNotFound();
  }

  // Predicate -> condición
  let userFound = users.find((user) => user.username === username);

  if (!userFound) {
    return GetErrorNotMatch();
  }

  if (userFound.password !== password) {
    return GetErrorNotMatch();
  }

  // Eliminamos la propiedad "password" antes de almacenar el usuario activo
  const { password: _, ...userWithoutPassword } = userFound;
  SetItem(LOCAL_STORAGE_KEYS.activeUser, userWithoutPassword);

  return {
    ok: true,
    user: userWithoutPassword,
  };
}

function logout() {
  RemoveItem(LOCAL_STORAGE_KEYS.activeUser);
}
//#endregion Login and Logout

export { createUser, login, logout, createUserRolCommon, getUsers,updateUser,getUserByUsername};
