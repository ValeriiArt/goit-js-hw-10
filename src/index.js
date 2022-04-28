import './css/styles.css';
import API from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import markupListTemplate from './templates/markupList';
// import markupCardTemplate from './templates/markupCard';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchForm: document.querySelector('#search-box'),
    countryCard: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {

    const search = refs.searchForm.value;
    const searchCountries = search.trim();

    if (searchCountries!== "") {
        API.fetchCountries(searchCountries)
            .then(renderCountryCard)
            .catch(onFetchError)
            .finally();
    } else {
        clearResultMarkup(true, true);
    }
};

function renderCountryCard(countries) {
        
        if(countries.length > 10 ){
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            clearResultMarkup(true, true);
            return;
        } else if (countries.length >= 2 && countries.length <= 10) { 
        const markupList = countries
        .map(( country ) => {
            const { name, flags } = country;
            return `<li>
                        <p><b><img class="counry-item__flag" src="${flags.svg}" alt=""></img></b> ${name}</p>
                    </li>`;
                }).join("");
            clearResultMarkup(false, true);
       refs.countryList.innerHTML = markupList;
    } 
    else {
        const markupCard = countries
        .map(( country ) => {
            const { name, capital, population, flags, languages } = country;
            const countryLanguages = languages.map(language => language.name).join(", ");
            return `<li>
                <p><b>Name</b>: ${name}</p>
                <p><b>Capital</b>: ${capital}</p>
                <p><b>Population</b>: ${population}</p>
                <p><b>Flag</b>: <img class="counry-item__flag" src="${flags.svg}" alt=""></img></p>
                <p><b>Languages</b>: ${countryLanguages}</p>
                </li>`;
        }).join("");
        clearResultMarkup(true, false);
        refs.countryCard.innerHTML =  markupCard;
    };

};

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearResultMarkup(true, true);
}

function clearResultMarkup(list, card) {
    if (list && card) {
       refs.countryList.innerHTML = "";
        refs.countryCard.innerHTML = ""; 
    } else if (list && !card) {
        refs.countryList.innerHTML = "";
    } else {
        refs.countryCard.innerHTML = ""; 
    }
}
