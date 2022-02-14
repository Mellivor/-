import Api from "./API.js"
import {paginationBlock , elemToHtml, headerHtml} from "./htmlGenerator.js"


ADDHtmlToDom( document.querySelector(".allapp"), headerHtml())
const tvProgram = "tv"
const movie = "movie"
const wrapper = document.querySelector(".app")
const form = document.querySelector("body > div.allapp > header > div > div > div.flex-fill.serch-bloc.d-flex.justify-content-center > form")
const radioForm = document.querySelector("body > div.allapp > header > div > div > div:nth-child(2) > form")
const input = document.querySelector("#searchInput")
const header = document.querySelector("body > div.allapp > header")
const movieButton = document.querySelector("body > div > header > div > div > ul > li:nth-child(1) > a")
const serialButton = document.querySelector("body > div > header > div > div > ul > li:nth-child(2) > a")
const searchButton = document.querySelector("body > div.allapp > header > div > div > div.flex-fill.serch-bloc.d-flex.justify-content-center > button")
const loader = document.querySelector("#loader")
const top_rated = "top_rated"
const popular = "popular"

const preventDefault = (event) => {
if (event.target === movieButton || event.target ===serialButton || event.target ===searchButton) {
        event.preventDefault()
    };
}

const ButtonLogic = (event, correctElement, category, radioValue, popString, topstring) => {
    if (event.target === correctElement) {
        if (radioValue.inlineRadioOptions.value == "popular") {
            fatchingAndInsertAll(category, popString, null ,null, insertHtmlToDom)
        } else if (radioValue.inlineRadioOptions.value == "topRated") {
            fatchingAndInsertAll(category, topstring, null ,null, insertHtmlToDom)
        }
    }
}

const searchLogoc = (event) => {
    if (event.target === searchButton && input.value) {
        fatchingAndInsertAll(movie, null, input.value,null, insertHtmlToDom)
        input.value =""
    }
}

const likeDizlikeLogiSwitch = (target ,classListArray) => {
    classListArray.forEach( (e)=>toggleClass(target, e))
}

wrapper.addEventListener("click", (e) => {
    if (e.target.tagName == "I") {
        likeDizlikeLogiSwitch(e.target, ["fa-heart-crack", "fa-heart", "red"])
    }
})

header.addEventListener("click", (e) => {
    preventDefault(e)
    ButtonLogic(e, movieButton, movie, radioForm, popular, top_rated)
    ButtonLogic(e, serialButton, tvProgram, radioForm, popular, top_rated)
    searchLogoc(e)
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fatchingAndInsertAll(movie,null ,input.value,null, insertHtmlToDom)
    input.value =""
}
)

const objToStandart = (obj) => {
    const newObj = {};
    if (obj.original_title) {
        newObj.title = obj.original_title;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.release_date;
        newObj.reit = obj.vote_average;
        newObj.id =obj.id;
    } else {
        newObj.title = obj.original_name;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.first_air_date;
        newObj.reit = obj.vote_average;
        newObj.id = obj.id;
    }
    return newObj
}
const transformDataToHtml = ({results, total_pages, page}) => {
    const html = results.reduce((acc, item) => {
    acc += elemToHtml(objToStandart(item));
    return acc;
    }, "")
    if (total_pages != page && total_pages > 0) {
        return html + paginationBlock()
    } else html
    return html
}

function ADDHtmlToDom(target, html) {
    target.innerHTML += html
}

function insertHtmlToDom(target, html) {
    target.innerHTML = html
}
const chooseFatchApi = async (category, rank, searchString, page) => {
    if (!searchString) {
        const fatchingResult = await Api.fetchPopular(category, rank, page)
        return  fatchingResult
    } else {
        const fatchingResult = await Api.search(category, searchString, page)
        return fatchingResult
    }
}

function toggleClass(target, className, method = "toggle") {
    if (method == "toggle") {
        target.classList.toggle(className)
    } else if (method == "remove") {
        target.classList.remove(className)
    } else if (method == "add") {
        target.classList.add(className)
    }
}

const startLoad = () => {
        toggleClass(loader, "shown", "add")
}
const endLoad = () => {
    toggleClass(loader, "shown", "remove")
}

const fatchingAndInsertAll = async (category, rank, searchString, page, insertMethod) => {
    startLoad()
    const fatchingResult = await chooseFatchApi(category, rank, searchString, page)
    insertMethod(wrapper, transformDataToHtml(fatchingResult))
    endLoad()
    if (fatchingResult.page < fatchingResult.total_pages) {
        document.querySelector("body > div > div > button").addEventListener("click", (e) => {
            e.target.remove()
            fatchingAndInsertAll(category, rank, searchString, fatchingResult.page + 1, ADDHtmlToDom)
        })
    }
}
