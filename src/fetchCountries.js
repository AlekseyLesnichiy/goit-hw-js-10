
const refs = {
    "input": document.querySelector("#search-box"),
    "ul": document.querySelector(".country-list"),
    "div": document.querySelector(".country-info"),
}




function fetchCountries() {
    let searchQuery = refs.input.value.trim();
    if (searchQuery === "") {
        refs.ul.innerHTML = " ";
        return;
    }
    fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=capital,population,languages,name,flags`)
        
        .then(response => response.json())
        .then(value => {
            if (value.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }
            if (value.length >= 2 && value.length <= 10) {
                value.forEach((value) => {
               refs.ul.insertAdjacentHTML("beforeend", test(value))
           })
                // for (let i = 0; i < value.length; i += 1) {
                //     refs.ul.insertAdjacentHTML("beforeend", test(value[i]))
                // }
            
            }
            if (value.length === 1) {
                console.log(value);
                refs.ul.insertAdjacentHTML("beforeend", makeSingleCounty(value));
            }
     
        })
        .catch(Notiflix.Notify.failure("Oops, there is no country with that name"));
   
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