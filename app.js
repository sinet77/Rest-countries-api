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




// searchButton.addEventListener('click', async () => { 



// })

countryInput.addEventListener('keydown', async function (event) {

    if (event.key === 'Enter') {

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
    // countryBox.classList.toggle('clicked1')

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



// async function filterCountries(){
//     const
// }
