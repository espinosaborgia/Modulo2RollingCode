import { login, logout } from "./services/user.app.js";
import { SwalAlerts } from "./helpers/swal.helper.js";
import { validateIfIsEmpty } from "./helpers/string.helper.validator.js";
import { ERROR_MESSAGES } from "./configurations/messages.config.js";
//#region  Variables
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");

let _email, _password;

//#endregion Variables

//#region  Events
email.addEventListener("change", function (e) {
  _email = e.target.value;
});

password.addEventListener("change", function (e) {
  _password = e.target.value;
});

btnLogin.addEventListener("click", function () {
  let response = login(_email, _password);

  if (validateIfIsEmpty(_email)) {
    SwalAlerts.error(ERROR_MESSAGES.email_empty);
    return;
  }

  if (validateIfIsEmpty(_password)) {
    SwalAlerts.error(ERROR_MESSAGES.password_empty);
    return;
  }

  if (response.ok) {
    SwalAlerts.succes("Bienvenido", response.user.username);
    setInterval(() => {
      const button = document.querySelector(".swal2-confirm");
      if (button === null) {
        window.location.href = "/";
      }
    }, 500);
  } else {
    SwalAlerts.error(response.error);
  }
});

btnLogout.addEventListener("click", function () {
  logout();
  window.location.href = "/";
});
//#endregion Events
