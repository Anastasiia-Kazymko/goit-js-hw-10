function fetchCountries(countrySearch) {
    return fetch(`https://restcountries.com/v3.1/name/${countrySearch}?fields=name,capital,population,flags,languages`).then
        ((response) =>  response.json());
};

export default { fetchCountries };