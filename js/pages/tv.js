import { Home } from "./home.js";
import { insertHtmlToDom, transformDataToHtml, fatchingAndInsertAll } from "../helpers/rotModificators.js"
import { arrName, popular, top_rated, movie, tvProgram, clasesArr, tegI, toggle, remove, add, shown, dataAttributes, bookM } from "../controlStrings.js"

export function Tv(root) {
    Home(root);
    const wrapper = document.querySelector(".app");

    if (window.location.search.includes(popular) || !window.location.search) {
        fatchingAndInsertAll(wrapper, tvProgram, popular, null, null, insertHtmlToDom)
    } else if (window.location.search.includes(top_rated)){
        fatchingAndInsertAll(wrapper, tvProgram, top_rated, null, null, insertHtmlToDom)
    } else {
        fatchingAndInsertAll(wrapper, tvProgram, window.location.search.replace('?',""), null, 1, insertHtmlToDom, true);
    };
};
