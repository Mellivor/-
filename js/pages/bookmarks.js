import { Home } from "./home.js";
import { insertHtmlToDom, transformDataToHtml, fatchingAndInsertAll } from "../helpers/rotModificators.js"
import { arrName,  movie, tegI, bookM } from "../controlStrings.js"



export function Bookmarks(root) {
    Home(root);

    const wrapper = document.querySelector(".app");

    const bookmarksArr = JSON.parse(localStorage.getItem(arrName));

    insertHtmlToDom(wrapper, transformDataToHtml({ results: bookmarksArr }));

    document.querySelectorAll(tegI).forEach(e => e.setAttribute(bookM, bookM));

    if (window.location.search) {
        fatchingAndInsertAll(wrapper, movie, window.location.search.replace('?',""), null, 1, insertHtmlToDom, true);
    };

};
