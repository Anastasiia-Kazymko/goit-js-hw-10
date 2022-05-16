import './css/styles.css';
import debounce from 'lodash.debounce';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('country-info'),
}
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
    let countrySearch = e.target.value;

    fetch(`https://restcountries.com/v3.1/name/${countrySearch}?fields=name,capital,population,flags,languages`).then(
    (response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((data) => {
        const countries = data.reduce((acc, country) => acc + `<li class="country-el"><img src="${country.flags.svg}" width="40"> ${country.name.common}</li>`, "");
        refs.countryList.insertAdjacentHTML('beforeend', countries);
        
    }); 
}

