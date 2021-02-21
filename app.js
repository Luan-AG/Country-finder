//Select an Option

const triangle = document.querySelector('.triangle');
const dropdown = document.querySelector('.container-option ul');

triangle.addEventListener('click', function(){
    dropdown.classList.toggle('dropdown');
    triangle.classList.toggle('rotation');
})

const twoCountries = document.querySelector('.two-countries');
twoCountries.addEventListener('click', function(){
    const formTwoCountries = document.querySelector('.form-two-countries');
    formTwoCountries.classList.toggle('form-invisible'); 
    dropdown.classList.toggle('dropdown');
    triangle.classList.toggle('rotation');
})


//Compare Two Countries API
const countriesContainer = document.querySelector('.countries');
const btnSearch = document.querySelector('.btn-search');
btnSearch.addEventListener('click', function(e){
    e.preventDefault();
    countriesContainer.innerHTML = '';
    let country1 = document.querySelector('.country-1').value;
    let country2 = document.querySelector('.country-2').value;
    
    const getCountryData = async function (country) {
        try {
            const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
            const data = await res.json();
            
            console.log(res);

            if (!res) throw new Error('not found');
            

            function pop(){
                if(data[0].population >= 1000000) {
                    return (data[0].population / 1000000).toFixed(1) + 'M ';
                } else {
                    return (data[0].population / 1000).toFixed(1) + 'K ';
                }
            }
            const html = `
            <article class="country">
            <img class="country__img" src="${data[0].flag}" />
            <div class="country__data">
                <h3 class="country__name">${data[0].name}</h3>
                <h4 class="country__region">(${data[0].region})</h4>
                <p class="country__row"><span class="tooltip">&#127988<span class="tooltiptext">Capital City</span></span>${data[0].capital}</p>
                <p class="country__row"><span class="tooltip">👫 <span class="tooltiptext">Population</span></span>${pop()}people</p>
                <p class="country__row"><span class="tooltip">🗣️ <span class="tooltiptext">Language</span></span>${data[0].languages[0].name}</p>
                <p class="country__row"><span class="tooltip">💰 <span class="tooltiptext">Currency</span></span>${data[0].currencies[0].name}</p>
            </div>
            </article>
            `;
            countriesContainer.insertAdjacentHTML('beforeend', html);
            countriesContainer.style.opacity = 1;
        } catch (err) {
            console.error("Deu ruimm");
        }
        
    }
    getCountryData(country1);
    getCountryData(country2);
})