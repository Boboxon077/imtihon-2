// ! about 


let id = window.location.href.slice(
  window.location.href.indexOf("?") + 1,
  window.location.href.length
);

let borders = "";
let about = document.querySelector(".about-page");
let API = `https://countries-api-v7sn.onrender.com/countries/slug/${id}`;
const loader = document.querySelector(".lds-ring");
const backdrop = document.querySelector(".backdrop");

body = document.body;
let mode = localStorage.getItem("mode")
  ? localStorage.getItem("mode")
  : "light";
if (localStorage.getItem("mode")) {
  if (mode === "light") {
    body.classList = "light";
  } else if (mode === "dark") {
    body.classList = "dark";
  }
}

function changeMode() {
  if (mode === "light") {
    body.classList = "dark";
    mode = "dark";
  } else if (mode === "dark") {
    body.classList = "light";
    mode = "light";
  }
  localStorage.setItem("mode", mode);
}

fetch(API)
  .then((res) => res.json())
  .then((child) => {
    console.log(child);
    child.borders.forEach((child) => {
      borders += `<a href="about.html?${child.slug}">${child.common}</a>`;
    });
    about.innerHTML = `
    <div class="page-left">
            <img src="${child.flags.svg}">
        </div>
        <div class="page-right">
            <h2>${child.name.common}</h2>
            <div class="page-center">
                <div class="center-left">
                    <p>Native Name: <span>${child.name.nativeName}</span></p>
                    <p>Population: <span>${child.population}</span></p>
                    <p>Region: <span>${child.region}</span></p>
                    <p>Sub Region: <span>${child.subregion}</span></p>
                </div>
                <div class="center-right">
                    <p>Top Level Domain: <span>${child.cca3}</span></p>
                    <p>Currencies: <span>${child.currencies}</span></p>
                    <p>Languages: <span>${child.languages.join(", ")}</span></p>
                </div>
            </div>
            <div class="borderr">
                <div class="border-left">
                    Border Countries:
                </div>
                <div class="border-right">
                    ${borders}
                </div>
            </div>
        </div>
        `;
    loader.classList.toggle("d-f");
    backdrop.classList.toggle("d-f");
  });
