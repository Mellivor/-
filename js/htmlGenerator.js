export const paginationBlock = () => {
    return `
        <button type="button" class="btn btn-primary loadMore">Load more</button>
    `
    // return `<div class="btn-group mr-1" role="group" aria-label="Basic example">
    //     <button type="button" class="btn btn-primary loadMore">Load more</button>
    // </div>`
}

 export const elemToHtml = ({ title, overview, poster, date, reit }) => {
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

            <i class="fa-solid fa-heart"></i>

        </ul>
      </div>
    </div>
  </div>
</div>`
}

export const headerHtml = () => {
    return `
    <header class="p-3 bg-dark text-white sticky-top">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul class="nav col-3 col-lg-auto  mb-2 justify-content-center mb-md-0">
                        <li><a href="#" class="nav-link px-2 text-white">Movies</a></li>
                        <li><a href="#" class="nav-link px-2 text-white">TV</a></li>
                    </ul>
                    <div class="flex-fill text-center  me-lg-auto">
                        <form class="radio-form">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="topRated" value="topRated" >
                                <label class="form-check-label" for="topRated">Top Rated</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="popular" value="popular" checked>
                                <label class="form-check-label" for="popular">Popular</label>
                            </div>
                        </form>
                    </div>
                    <div class="flex-fill text-center  me-lg-auto ">
                        <h1>MelliMovie PoC</h1>
                    </div>
                    <form class="col-4 col-lg-auto mb-lg-0 me-lg-3">
                        <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
                    </form>
                    <div class="text-end">
                        <button type="button" class="btn btn-outline-light me-3">Search</button>
                    </div>
                </div>
            </div>
        </header>
        <div class="app container mt-2">
        </div>
    `
}
