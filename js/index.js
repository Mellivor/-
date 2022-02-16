import Api from "./API.js"
import {paginationBlock , elemToHtml, headerHtml} from "./htmlGenerator.js"
import {arrName, popular, top_rated, movie, tvProgram, clasesArr, tegI, toggle, remove, add ,shown,dataAttributes, bookM } from "./controlStrings.js"

ADDHtmlToDom( document.querySelector(".allapp"), headerHtml())

const wrapper = document.querySelector(".app")
const form = document.querySelector("body > div.allapp > header > div > div > div.flex-fill.serch-bloc.d-flex.justify-content-center > form")
const radioForm = document.querySelector("body > div.allapp > header > div > div > div:nth-child(2) > form")
const input = document.querySelector("#searchInput")
const header = document.querySelector("body > div.allapp > header")
const movieButton = document.querySelector("body > div > header > div > div > ul > li:nth-child(1) > a")
const serialButton = document.querySelector("body > div.allapp > header > div > div > ul > li:nth-child(2) > a")
const searchButton = document.querySelector("body > div.allapp > header > div > div > div.flex-fill.serch-bloc.d-flex.justify-content-center > button")
const loader = document.querySelector("#loader")
const bookmarksButt = document.querySelector("#bookmarksButt")

const preventDefault = (event) => {
if (event.target === movieButton || event.target ===serialButton || event.target ===searchButton) {
        event.preventDefault()
    };
}

const bookmarksLogic = (event) => {
    if ((event.target === bookmarksButt || event.target.getAttribute(bookM)) && localStorage.getItem(arrName)) {
        const bookmarksArr = JSON.parse(localStorage.getItem(arrName))
        insertHtmlToDom(wrapper, transformDataToHtml({ results: bookmarksArr }))
        document.querySelectorAll(tegI).forEach(e => e.setAttribute(bookM, bookM))
    } else if (event.target.getAttribute(bookM) && !localStorage.getItem(arrName)) {
        insertHtmlToDom(wrapper,"")
    }
}

const ButtonLogic = (event, correctElement, category, radioValue ) => {
    if (event.target === correctElement) {
        if (radioValue.inlineRadioOptions.value == popular) {
            fatchingAndInsertAll(category, popular, null ,null, insertHtmlToDom)
        } else if (radioValue.inlineRadioOptions.value == top_rated) {
            fatchingAndInsertAll(category, top_rated, null ,null, insertHtmlToDom)
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

const localStorageLogic = (key, value) => {
    if (!localStorage.getItem(key)) {
            const bookArr = [value]
            localStorage.setItem(key, JSON.stringify(bookArr))
        } else {
            const bookArr = JSON.parse(localStorage.getItem(key))
            if (bookArr.some((i) =>i.id == value.id)) {
                    const filtredArr = bookArr.filter((item) => (item.id != value.id))
                    if (filtredArr.length < 1) {
                        localStorage.removeItem(key)
                        console.log(remove);
                    } else {
                        localStorage.setItem(key, JSON.stringify(filtredArr))
                    }
            } else {
                bookArr.push(value)
                localStorage.setItem(key, JSON.stringify(bookArr))
            }
        }
}

wrapper.addEventListener("click", (e) => {
    if (e.target.tagName == tegI) {
        likeDizlikeLogiSwitch(e.target, clasesArr)
        localStorageLogic(arrName,
            {
                title: e.target.getAttribute(dataAttributes.title),
                overview: e.target.getAttribute(dataAttributes.overview),
                poster: e.target.getAttribute(dataAttributes.poster),
                date: e.target.getAttribute(dataAttributes.date),
                reit: e.target.getAttribute(dataAttributes.reit),
                id: e.target.getAttribute(dataAttributes.id),

            })
        if (e.target.getAttribute("bookM")) {
            bookmarksLogic(e)
        }
    }
})

header.addEventListener("click", (e) => {
    preventDefault(e)
    ButtonLogic(e, movieButton, movie, radioForm)
    ButtonLogic(e, serialButton, tvProgram, radioForm)
    searchLogoc(e)
    bookmarksLogic(e)
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
    } else if (obj.original_name) {
        newObj.title = obj.original_name;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.first_air_date;
        newObj.reit = obj.vote_average;
        newObj.id = obj.id;
    } else return obj
    return newObj
}
function transformDataToHtml({ results, total_pages, page }) {
    const html = results.reduce((acc, item) => {
        acc += elemToHtml(objToStandart(item))
        return acc
    }, "")
    if (total_pages != page && total_pages > 0) {
        return html + paginationBlock()
    } else
        html
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

function toggleClass(target, className, method = toggle) {
    if (method == toggle) {
        target.classList.toggle(className)
    } else if (method == remove) {
        target.classList.remove(className)
    } else if (method == add) {
        target.classList.add(className)
    }
}

const startLoad = () => {
        toggleClass(loader, shown, add)
}
const endLoad = () => {
    toggleClass(loader, shown, remove)
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
