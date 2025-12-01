const cityName = document.querySelector(".city-name");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const weatherSymbol = document.querySelector("#icon");
const temparature = document.querySelector(".temp");
const Date = document.querySelector(".date");
const windSpeed = document.querySelector(".wind-speed");
const humility = document.querySelector(".humility");


async function getWeatherInfo() {

    let query = searchBar.value.trim();

    if (query.length <= 4 && query !== ''){
        query = query + ' city';
    }


    cityName.textContent = 'Loading...';
    temparature.textContent = '...';
    windSpeed.textContent = '...';
    humility.textContent = '...';
    weatherSymbol.src = '';

    try {

        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=19b26a4b32ae49e299f221349252711&q=${query}&aqi=no` );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);

            cityName.textContent = 'Not Found';
            temparature.textContent = '—';
            windSpeed.textContent = '—';
            humility.textContent = '—';

            return;
        }

        const data = await response.json();

        cityName.textContent = data.location.name;

        temparature.textContent = `${Math.round(data.current.temp_c)}°C`;
        windSpeed.textContent = `${data.current.wind_mph} m/h`;
        humility.textContent = `${data.current.humidity}%`;

        const iconUrl = data.current.condition.icon;  
        const bigIcon = iconUrl.replace("64x64", "128x128");
        weatherSymbol.src = "https:" + bigIcon;

    } catch (error) {
        
    }


}


async function getUserWeatherInfo() {

    if (!navigator.geolocation){
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const q = `${position.coords.latitude},${position.coords.longitude}`;

            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=19b26a4b32ae49e299f221349252711&q=${q}`);
            
            const data = await response.json();

            console.log(data);

            cityName.textContent = data.location.name;

            temparature.textContent = `${Math.round(data.current.temp_c)}°C`;
            windSpeed.textContent = `${data.current.wind_mph} m/h`;
            humility.textContent = `${data.current.humidity}%`;

            const iconUrl = data.current.condition.icon;  
            const bigIcon = iconUrl.replace("64x64", "128x128");
            weatherSymbol.src = "https:" + bigIcon;
        },
        (error) => {
           // alert("Error:", error.message);
            if (error.code === 1) alert("You denied permission");
            if (error.code === 2) alert("Location unavailable");
            if (error.code === 3) alert("Timeout");
        }
    )
}

searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        getWeatherInfo(); 
    }
});

getUserWeatherInfo();
