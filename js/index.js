import Api from "./API.js"
import {paginationBlock , elemToHtml} from "./htmlGenerator.js"

const tvProgram = "tv"
const movie = "movie"
const wrapper = document.querySelector(".app")
const topRadio = document.querySelector("#topRated")
const popularRadio = document.querySelector("#popular")
const form = document.querySelector("body > header > div > div > form")
const input = document.querySelector("body > header > div > div > form > input")
const header = document.querySelector("body > header")
const movieButton = document.querySelector("body > header > div > div > ul > li:nth-child(1) > a")
const serialButton = document.querySelector("body > header > div > div > ul > li:nth-child(2) > a")
const searchButton = document.querySelector("body > header > div > div > div.text-end > button")
const top_rated = "top_rated"
const popular = "popular"

const preventDefault = (event) => {
if (event.target === movieButton || event.target ===serialButton || event.target ===searchButton) {
        event.preventDefault()
    };
}
const ButtonLogic = (event, correctElement, category) => {
    if (event.target === correctElement) {
        if (popularRadio.checked) {
            fatchingAndInsertAll(category, popular,null ,null, insertHtmlToDom)
        } else if (topRadio.checked) {
            fatchingAndInsertAll(category, top_rated,null ,null, insertHtmlToDom)
        }
    }
}

const searchLogoc = (event) => {
    if (event.target === searchButton || input.value.lenght>0) {
        fatchingAndInsertAll(movie, null, input.value,null, insertHtmlToDom)
        input.value =""
    }
}

header.addEventListener("click", (e) => {
    preventDefault(e)
    ButtonLogic(e, movieButton, movie)
    ButtonLogic(e, serialButton, tvProgram)
    searchLogoc (e)
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
    } else {
        newObj.title = obj.original_name;
        newObj.overview = obj.overview;
        newObj.poster = obj.poster_path;
        newObj.date = obj.first_air_date;
        newObj.reit = obj.vote_average;
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

const ADDHtmlToDom = (target, html) => {
        target.innerHTML+=html
}
const insertHtmlToDom = (target, html) => {
        target.innerHTML=html
}
const fatchingAndInsert = async (category, rank, page, insertMethod) => {
    const fatchingResult = await Api.fetchPopular(category, rank, page)
    console.log(fatchingResult.total_pages);
    insertMethod(wrapper, transformDataToHtml(fatchingResult))
    document.querySelector("body > div > button").addEventListener("click", (e) => {
        e.target.remove()
        fatchingAndInsert(category, rank, fatchingResult.page+1 ,ADDHtmlToDom)
    })
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

const fatchingAndInsertAll = async (category, rank, searchString, page, insertMethod) => {
    const fatchingResult = await chooseFatchApi(category, rank, searchString, page)
    console.log(fatchingResult.total_pages);
    insertMethod(wrapper, transformDataToHtml(fatchingResult))
    if (fatchingResult.page < fatchingResult.total_pages) {
        document.querySelector("body > div > button").addEventListener("click", (e) => {
            e.target.remove()
            fatchingAndInsertAll(category, rank, searchString, fatchingResult.page + 1, ADDHtmlToDom)
        })
    }
}
const fatchingSerch = async (category, searchString, page, insertMethod) => {
    const fatchingResult = await Api.search(category, searchString, page)
    console.log(fatchingResult);
    insertMethod(wrapper, transformDataToHtml(fatchingResult))
    document.querySelector("body > div > button").addEventListener("click", (e) => {
        e.target.remove()
        fatchingSerch(movie, searchString, fatchingResult.page + 1 ,ADDHtmlToDom)
    })
}
