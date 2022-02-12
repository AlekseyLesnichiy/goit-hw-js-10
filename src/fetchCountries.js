function search(value) {
  return  fetch(`https://restcountries.com/v3.1/name/${value}?fields=capital,population,languages,name,flags`)
    .then(response => response)
}
export default search;