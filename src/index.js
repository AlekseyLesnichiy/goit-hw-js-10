import './css/styles.css';
import Notiflix from 'notiflix';
import search from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    "input": document.querySelector("#search-box"),
    "ul": document.querySelector(".country-list"),
    "div": document.querySelector(".country-info"),
}

refs.input.addEventListener("input", debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries() {
    let searchQuery = refs.input.value.trim();
    if (searchQuery === "") {
        refs.ul.innerHTML = " ";
        return;
    }
   
    fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=capital,population,languages,name,flags`)
    //  search(searchQuery)
    .then(function (response) {
            if (!response.ok) {
                throw Error;
            }
            return response;
        })
        .then(response => response.json())
        .then(value => {
            if (value.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }
            if (value.length >= 2 && value.length <= 10) {
                refs.ul.innerHTML = "";
                value.forEach(value => {     
               refs.ul.insertAdjacentHTML("beforeend", test (value))
           }) 
            }
            if (value.length === 1) {
                refs.ul.innerHTML = makeSingleCounty(value)
            }
          
     
        })
        .catch(error => {
             Notiflix.Notify.failure("Oops, there is no country with that name")
        })
        
   
}
function makeSingleCounty(value) {
    return value.map(({ capital, population, languages, flags, name }) => {
        return `
        <li>
    <img
      class="flag__image"
      src="${flags.svg}"
      alt="Flag of ${name}"
    />
        <h1 class="li__title">
        ${name.official}
        </h1>
        <p><span class="li__names">Capital:</span>${capital}</p>
        <p><span class="li__names">Population:</span>${population}</p>
        <p><span class="li__names">Languages:</span>${Object.values(languages)}</p>
        </li>`
    }).join(" ");
}
function test(value) {
    let { name, flags } = value;
    return  `
        <li>
    <img
      class="flag__image"
      src="${flags.svg}"
      alt="Flag of ${name}"
    />
        <h1 class="li__title">
        ${name.official}
        </h1>
        </li>`
   
}

