import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
    let countrySearch = e.target.value;

    fetch(`https://restcountries.com/v3.1/name/${countrySearch}?fields=name,capital,population,flags,languages`).then(
        (response) => {            
            if (response.ok) {
                return response.json();
            };
        }).then(showCountry)
        .catch(error => {
            console.log(error);
            Notiflix.Notify.failure(`Oops, there is no country with that name`); 
        });
};


function showCountry(data) {    
    if ( data.length > 2 && data.length < 10) {
            const countries = data.map((country) => `<li class="country-el"><img src="${country.flags.svg}" width="40"> ${country.name.common}</li>`).join("");
        refs.countryList.insertAdjacentHTML('beforeend', countries);     
        }
    if (data.length === 1) {
            const countryCard = data.map((country) => `<div><div><img src="${country.flags.svg}" width="40"><h1> ${country.name.common}</h1></div><p>Capital: ${country.capital}</p><p>Population: ${country.population}/p><p>Languages: ${country.languages}</p></div>`).join("");
            console.log(countryCard)
        refs.countryInfo.insertAdjacentHTML('beforeend', countryCard);
        }
        if (data.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`); 
        }
};
