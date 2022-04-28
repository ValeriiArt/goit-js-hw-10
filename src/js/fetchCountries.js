const BASE_URL = 'https://restcountries.com/v2';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}`).then(
        response => {
            if (!response.ok) {
            throw new Error(response.status);
            }
            return response.json();
        }
    );
};

export default { fetchCountries };