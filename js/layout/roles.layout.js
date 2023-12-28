import { GetItem } from "../services/local-storage.app.js";
import { LOCAL_STORAGE_KEYS } from "../configurations/keys.config.js";

const roles = GetItem(LOCAL_STORAGE_KEYS.roles);

let htmlString = "<select>";

roles.forEach((rol) => {
  htmlString += `<option value=${rol.id}>${rol.description}</option>`;
});

htmlString += "</select>";

export { htmlString as RoleSelectHtml };
