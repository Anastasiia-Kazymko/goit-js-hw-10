import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));



function onSearchBoxInput(e) {
    let countrySearch = e.target.value.trim();
    if (countrySearch === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    }

    API.fetchCountries(countrySearch).then(showCountry).catch(onFetchError);
};

function showCountry(data) {    
    if ( data.length >= 2 && data.length <= 10) {
            const countries = data.map((country) => `<li class="country-el"><img src="${country.flags.svg}" width="40"> ${country.name.official}</li>`).join("");
        refs.countryList.insertAdjacentHTML('beforeend', countries);  
        refs.countryInfo.innerHTML = '';
    };
    if (data.length === 1) {
        const countryCard = data.map((country) => `<div class="card"><div class="title"><img src="${country.flags.svg}" width="40" height="30">
            <h1> ${country.name.official}</h1></div><p><span>Capital:</span> ${country.capital}</p><p><span>Population:</span> ${country.population}</p>
            <p><span>Languages:</span> ${Object.values(country.languages).join(', ')}</p></div>`).join("");
        console.log(countryCard);
        refs.countryInfo.insertAdjacentHTML('afterbegin', countryCard); 
        refs.countryList.innerHTML = '';
    };
    if (data.length > 10) {            
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`); 
    };    
};

function onFetchError(error) {
    console.log(error);
    Notiflix.Notify.failure(`Oops, there is no country with that name`);
};
