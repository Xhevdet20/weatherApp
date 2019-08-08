const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data)=>{
    
    // Distructure
    const {cityDets, weather} = data;

    // Update Detail Template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // Update the day/night icon images
    const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

     const timeSrc = (weather.IsDayTime)? './img/day.svh' : './img/night.svg';
     time.setAttribute('src', timeSrc);

    // Remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    

};

const updateCity = async (city)=> {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather }
};

cityForm.addEventListener('submit', e =>{
    // Prevent default action
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset(); 

    // Update the UI with the new City
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})