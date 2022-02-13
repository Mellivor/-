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
        </ul>
      </div>
    </div>
  </div>
</div>`
}
