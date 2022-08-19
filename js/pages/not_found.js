// import { insertHtmlToDom } from "../helpers/rotModificators.js"
// const root = document.querySelector(".allapp")

// export const NotFound = () => {
//     insertHtmlToDom(root,"<div class=\"d-flex justify-content-center\"><h1>Not found 404</h1></div>")
// }
export function NotFound(root) {
    root.innerHTML = `<div class=\"d-flex justify-content-center\"><h1>Not found 404</h1></div>`;
};
