import { Home } from "./home.js";
import { insertHtmlToDom, fatchingAndInsertAll } from "../helpers/rotModificators.js"
import { popular, top_rated, movie } from "../controlStrings.js"

export function Movies(root) {
    Home(root);
    const wrapper = document.querySelector(".app");

    if (window.location.search.includes(popular) || !window.location.search) {
        fatchingAndInsertAll(wrapper, movie, popular, null, null, insertHtmlToDom)
    } else if (window.location.search.includes(top_rated)) {
        fatchingAndInsertAll(wrapper, movie, top_rated, null, null, insertHtmlToDom)
    } else {
        fatchingAndInsertAll(wrapper, movie, window.location.search.replace('?',""), null, 1, insertHtmlToDom, true);
    };
};
