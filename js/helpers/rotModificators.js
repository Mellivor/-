import Api from "../API.js"
import { paginationBlock, elemToHtml, bigCard } from "../htmlGenerator.js"
import { movie, tvProgram, toggle, remove, add, shown } from "../controlStrings.js"


export function ADDHtmlToDom(target, html) {
    target.innerHTML += html
}

export function insertHtmlToDom(target, html) {
    target.innerHTML = html
}

export function transformDataToHtml({ results, total_pages, page }) {
        if (!results) {
            return null;
        };

        const html = results.reduce((acc, item) => {
            acc += elemToHtml(objToStandard(item))
            return acc
        }, "")
        if (total_pages != page && total_pages > 0) {
            return html + paginationBlock()
        } else
        return html
};

const objToStandard = (obj) => {
    const newObj = {};

    if (obj.number_of_episodes) {
        newObj.section = tvProgram;
        newObj.title = obj.name;
        newObj.episodes = obj.number_of_episodes;
        newObj.seasons = obj.number_of_seasons;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.first_air_date;
        newObj.reit = obj.vote_average;
        newObj.id = obj.id;
        newObj.vote_count = obj.vote_count;
        newObj.runtime = obj.runtime;
        newObj.genres = obj.genres;

        return newObj;
    }

    if (obj.genres) {
        newObj.section = movie;
        newObj.title = obj.original_title;
        newObj.title2 = obj.title;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.release_date;
        newObj.reit = obj.vote_average;
        newObj.id = obj.id;
        newObj.vote_count = obj.vote_count;
        newObj.runtime = obj.runtime;
        newObj.budget = obj.budget;
        newObj.genres = obj.genres;

        return newObj;
    }

    if (obj.original_title) {
        newObj.section = movie;
        newObj.title = obj.original_title;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.release_date;
        newObj.reit = obj.vote_average;
        newObj.id = obj.id;

        return newObj;
    }

    if (obj.original_name) {
        newObj.section = tvProgram;
        newObj.title = obj.original_name;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.first_air_date;
        newObj.reit = obj.vote_average;
        newObj.id = obj.id;

        return newObj;
    }

    return obj;
};



function toggleClass(target, className, method = toggle) {
        if (method == toggle) {
            target.classList.toggle(className)
        } else if (method == remove) {
            target.classList.remove(className)
        } else if (method == add) {
            target.classList.add(className)
        }
    };

const startLoad = () => {
    toggleClass(loader, shown, add)
};

const endLoad = () => {
    toggleClass(loader, shown, remove)
};

export const likeToggle = (target, classListArray) => {
        classListArray.forEach((e) => toggleClass(target, e))
};

const chooseFatchApi = async (category, rank, searchString, page) => {
    if (!searchString) {
        const fatchingResult = await Api.fetchPopular(category, rank, page)
        return fatchingResult
    } else {
        const fatchingResult = await Api.search(category, searchString, page)
        return fatchingResult
    }
};

let renderBigBanner = (fatchingResult, insertMethod, wrapper) => {
    insertMethod(wrapper, bigCard( objToStandard(fatchingResult)));
    endLoad();
};

export const fatchingAndInsertAll = async (wrapper, category, rank, searchString, page, insertMethod, byId) => {
    startLoad();
    const fatchingResult = await chooseFatchApi(category, rank, searchString, page);
    if (!byId) {
        insertMethod(wrapper, transformDataToHtml(fatchingResult));
        endLoad();
        if (fatchingResult.page < fatchingResult.total_pages) {
            document.querySelector("body > div > div > button").addEventListener("click", (e) => {
                e.target.remove();
                fatchingAndInsertAll(wrapper, category, rank, searchString, fatchingResult.page + 1, ADDHtmlToDom);
            });
        };
    } else {
        renderBigBanner(fatchingResult, insertMethod, wrapper);
    }
};
