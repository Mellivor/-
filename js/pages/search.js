import { Home } from "./home.js";
import { insertHtmlToDom, fatchingAndInsertAll } from "../helpers/rotModificators.js"
import { movie } from "../controlStrings.js"

export function Search(root) {
    Home(root);
    const wrapper = document.querySelector(".app");
    fatchingAndInsertAll(wrapper ,movie, null, window.location.search.replace('?',""), null, insertHtmlToDom)
};
