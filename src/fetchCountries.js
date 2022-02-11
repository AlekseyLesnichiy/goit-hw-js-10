function search(value) {
    fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=capital,population,languages,name,flags`)
    .then(response => response.json())
}