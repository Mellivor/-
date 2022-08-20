import { insertHtmlToDom , likeToggle } from "../helpers/rotModificators.js"
import { headerHtml} from "../htmlGenerator.js"
import { arrName, popular, top_rated, movie, tvProgram, clasesArr, tegI, dataAttributes, bookM } from "../controlStrings.js"

export function Home(root) {
    insertHtmlToDom(root, headerHtml());
    const wrapper = document.querySelector(".app");
    const form = document.querySelector("body > div.allapp > header > div > div > div.flex-fill.serch-bloc.d-flex.justify-content-center > form");
    const radioForm = document.querySelector("body > div.allapp > header > div > div > div:nth-child(2) > form");
    const input = document.querySelector("#searchInput");
    const header = document.querySelector("body > div.allapp > header");
    const moviesButton = document.querySelector("body > div > header > div > div > ul > li:nth-child(1) > a");
    const serialButton = document.querySelector("body > div.allapp > header > div > div > ul > li:nth-child(2) > a");
    const searchButton = document.querySelector("body > div.allapp > header > div > div > div.flex-fill.serch-bloc.d-flex.justify-content-center > button");
    const loader = document.querySelector("#loader");
    const bookmarksButt = document.querySelector("#bookmarksButt");

    const preventDefault = (event) => {
        if (event.target === moviesButton || event.target === serialButton || event.target === searchButton) {
            event.preventDefault();
        };
    };

    const bookmarksLogic = (event) => {
        if ((event.target === bookmarksButt || event.target.getAttribute(bookM)) && localStorage.getItem(arrName)) {
            window.history.pushState(null, null, '/bookmarks');
        }
    };

    const ButtonLogic = (event, correctElement, category, radioValue) => {
        if (event.target === correctElement) {
            window.history.pushState(null, null, `/${category}?${radioValue.inlineRadioOptions.value}`);
        };
    };

    const searchLogic = (event) => {
        if (event.target === searchButton && input.value) {
            window.history.pushState(null, null, `/search/?${input.value}`);
        };
    };

    const localStorageLogic = (key, value) => {
        if (!localStorage.getItem(key)) {
            const bookArr = [value]
            localStorage.setItem(key, JSON.stringify(bookArr))
        } else {
            const bookArr = JSON.parse(localStorage.getItem(key))
            if (bookArr.some((i) => i.id == value.id)) {
                const filtredArr = bookArr.filter((item) => (item.id != value.id))
                if (filtredArr.length < 1) {
                    localStorage.removeItem(key)
                    window.location.reload();
                } else {
                    localStorage.setItem(key, JSON.stringify(filtredArr))
                }
            } else {
                bookArr.push(value)
                localStorage.setItem(key, JSON.stringify(bookArr))
            }
        }
    };

    wrapper.addEventListener("click", (e) => {
        if (e.target.tagName == tegI) {
            likeToggle(e.target, clasesArr)
            localStorageLogic(arrName,
                {
                    title: e.target.getAttribute(dataAttributes.title),
                    overview: e.target.getAttribute(dataAttributes.overview),
                    poster: e.target.getAttribute(dataAttributes.poster),
                    date: e.target.getAttribute(dataAttributes.date),
                    reit: e.target.getAttribute(dataAttributes.reit),
                    id: e.target.getAttribute(dataAttributes.id),
                    section: e.target.getAttribute(dataAttributes.section),
                })
            if (e.target.getAttribute("bookM")) {
                bookmarksLogic(e)
            }

        } else if (window.location.search.replace('?', "") === top_rated ||
            window.location.search.replace('?', "") === popular ||
            window.location.pathname.includes('/bookmarks') ||
            window.location.pathname.includes('/search')
            ) {
            let id = e.path.find(e => e.hasAttribute("data-movie-id")).getAttribute("data-movie-id");
            let section  = e.path.find(e => e.hasAttribute(dataAttributes.section)).getAttribute(dataAttributes.section);
            window.history.pushState(null, null, `/${section}?${id}`);
        }
    });

    header.addEventListener("click", (e) => {
        preventDefault(e)
        ButtonLogic(e, moviesButton, movie, radioForm)
        ButtonLogic(e, serialButton, tvProgram, radioForm)
        searchLogic(e)
        bookmarksLogic(e)
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        window.history.pushState(null, null, `/search/?${input.value}`);
    });

};
