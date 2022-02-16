import { arrName } from "./controlStrings.js"

export const paginationBlock = () => "<button type=\"button\" class=\"btn btn-primary loadMore\">Load more</button>"


export const elemToHtml = ({ title, overview, poster, date, reit, id }) => {
    const defaultPoster = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3.jpg"
    return `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${!poster ? defaultPoster : "https://www.themoviedb.org/t/p/w300_and_h450_bestv2"+poster}" class="img-fluid rounded-start" alt="${title}poster">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <ul>
            <li>
               <span class="fw-bolder">Дата виходу в прокат:</span> ${date}
            </li>
            <li>
               <span class="fw-bolder">Оцінка:</span> ${reit}
            </li>
            <li>
               <span class="fw-bolder">Короткий опис:</span> ${overview}
            </li>

            ${liceState(title, overview, poster, date, reit, id)}
        </ul>
      </div>
    </div>
  </div>
</div>`
}

export const headerHtml = () => {
    return `
    <header class="p-2 bg-dark text-white ${window.matchMedia("(min-width: 993px)").matches ? "sticky-top":null} ">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <ul class="nav col-lg-auto  justify-content-center me-2">
                        <li><a href="#" class="nav-link px-2 text-white">Movies</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">TV</a></li>
                    </ul>
                    <div class=" text-center  me-lg-auto">
                        <form class="radio-form">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="top_rated" value="top_rated" >
                                <label class="form-check-label" for="top_rated">Top Rated</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="popular" value="popular" checked>
                                <label class="form-check-label" for="popular">Popular</label>
                            </div>
                        </form>
                    </div>
                    <div class="flex-fill text-center  me-lg-auto ">
                        <h1 class="fs-3">MelliMovie PoC</h1>
                    </div>
                    <div>
                    <button type="button" class="btn btn-outline-light m-1" id="bookmarksButt">Bookmarks</button>
                    </div>
                    <div class="${window.matchMedia("(min-width: 993px)").matches ? null:"w-50"} flex-fill serch-bloc d-flex justify-content-center">
                    <form class="  me-2">
                        <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search" id = "searchInput">
                    </form>
                        <button type="button" class="btn btn-outline-light">Search</button>
                    </div>
                </div>
            </div>
        </header>
        <div class="app container mt-2">
        </div>
    `
}
const liceState = (title, overview, poster, date, reit, id) => {
    if (!localStorage.getItem(arrName)) {
        return `<i class="fa-solid fa-heart-crack "
        data-elem-title="${title}"
        data-elem-overview="${overview}"
        data-elem-poster="${poster}"
        data-elem-date="${date}"
        data-elem-reit ="${reit}"
        data-elem-id ="${id}"
        ></i>`
    } else if (JSON.parse(localStorage.getItem(arrName)).some((i) =>i.id == id)) {
        return `<i class="fa-solid fa-heart red"
        data-elem-title="${title}"
        data-elem-overview="${overview}"
        data-elem-poster="${poster}"
        data-elem-date="${date}"
        data-elem-reit ="${reit}"
        data-elem-id ="${id}"
        ></i>`
    } else {
        return `<i class="fa-solid fa-heart-crack "
        data-elem-title="${title}"
        data-elem-overview="${overview}"
        data-elem-poster="${poster}"
        data-elem-date="${date}"
        data-elem-reit ="${reit}"
        data-elem-id ="${id}" >
        </i>`

    }
}
