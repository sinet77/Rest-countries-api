const app = document.querySelector('.background')
const filterSelector = document.querySelector('.filter');
const searchButton = document.getElementById('button'); // img lupki
const countryInput = document.querySelector('.country-bar')
const main = document.querySelector('.main')
const countryName = document.querySelector('.country-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const capital = document.querySelector('.capital')
const switchButton = document.querySelector('.switch')
const headline = document.querySelector('.headline')
const backButton = document.querySelector('.back-button')
const countryClick = document.querySelector('.country-click')
const clickMain = document.querySelector('.click-main')
const clickFlag = document.querySelector('.flag')


async function fetchCountriesData() {
    const response = await fetch(("data.json"));
    const data = await response.json();

    // console.log(data)
    return data;
}

fetchCountriesData()

async function fetchOneCountryData(countryName) {
    const response = await fetch(("data.json"));
    const data = await response.json();

    const country = data.find(country => country.name === countryName);
    if (country) {
        return country;
    } else {
        alert("Wrong country")
    }


}
async function startCountries() {
    const data = await fetchCountriesData();
    for (let i = 0; i < data.length; i++) {
        createCountries(data[i])
    }
}

startCountries()

countryInput.addEventListener('input', function () {
    const value = this.value.trim(); // Usunięcie białych znaków z początku i końca
    if (value.length > 0) {
        this.value = value.charAt(0).toUpperCase() + value.slice(1); // Zamiana tylko pierwszej litery na wielką
    }
});

countryInput.addEventListener('keydown', async function (event) {

    if (event.key === 'Enter') {
        main.innerHTML = ''
        const data = await fetchOneCountryData(countryInput.value);
        createCountries(data)


    }
});

switchButton.addEventListener('click', function () {

    app.classList.toggle('clicked')
    headline.classList.toggle('clicked1')
    filterSelector.classList.toggle('clicked1')
    countryInput.classList.toggle('clicked1')
    countryInput.classList.toggle('loupe-white')
    backButton.classList.toggle('clicked1')
    switchButton.classList.toggle('clicked1')
    clickMain.classList.toggle('clicked')
    // countryBox.classList.toggle('clicked1')

})

backButton.addEventListener('click', function () {
    app.classList.remove('hidden')
    countryClick.classList.add('hidden')
    main.classList.remove('hidden')
})

function createCountries(country) {

    const currentPopulation = country.population;
    const currentRegion = country.region;
    const currentCapital = country.capital;


    const countryBox = document.createElement('div');
    countryBox.classList.add('country-box');
    main.appendChild(countryBox);

    const flag = document.createElement('img');
    flag.classList.add('flag')
    flag.src = country.flags.png;
    countryBox.appendChild(flag)

    const description = document.createElement('div')
    description.classList.add('description')
    countryBox.appendChild(description)

    const countryName = document.createElement('div')
    countryName.classList.add('country-name')
    countryName.textContent = country.name;
    description.appendChild(countryName)


    const together = document.createElement('div')
    together.classList.add('together')
    description.appendChild(together)

    const population = document.createElement('div')
    population.classList.add('population')
    population.textContent = `Population: ${currentPopulation}`;
    together.appendChild(population)

    const region = document.createElement('div')
    region.classList.add('region')
    region.textContent = `Region: ${currentRegion}`;
    together.appendChild(region)

    const capital = document.createElement('div')
    capital.classList.add('capital')
    capital.textContent = `Capital: ${currentCapital}`;
    together.appendChild(capital)

    countryBox.addEventListener('click', async function () {
        const data = await fetchOneCountryData(country.name);
        clickOnTheCountry(data)

    })


}

function clickOnTheCountry(country) {
    main.classList.add('hidden')
    countryClick.classList.remove('hidden')
    const nativeName = country.nativeName;
    const currentNativeName = document.querySelector('.native-name')
    currentNativeName.textContent = `Native Name: ${nativeName}`
    // const currentPopulation = country.population;
    // const currentRegion = country.region;
    // const currentSubRegion = country.subregion
    // const currentCapital = country.capital;
    // const topLevelDomain = country.topLevelDomain;
    // const currency = country.currencies;
    // const languages = country.languages;
    // const borders = country.borders;


    countryName.textContent = country.name;
    clickFlag.src = country.flags.png;




}



filterSelector.addEventListener('change', async function (event) {
    const selectedOption = event.target.value;

    console.log('Wybrana opcja:', selectedOption);

    const countriesData = await fetchCountriesData()


    const countriesInRegion = countriesData.filter(country => country.region === selectedOption);
    main.innerHTML = ''
    countriesInRegion.forEach(createCountries);

    console.log(countriesInRegion);

});

