import './styles.css'

const apiKey = '996105329f024a569fd75434242202';
const baseUrl = 'https://api.weatherapi.com/v1';

async function searchLocation(query) {
    if(!query){
        return
    };

    const endpoint = '/search.json';
    const params = new URLSearchParams({
        key: apiKey,
        q: query
    });
    try {
        const response = await fetch(`${baseUrl}${endpoint}?${params}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getWeather(locationQuery){
    if(!locationQuery){
        return;
    }
    const endpoint = '/current.json'
    const params = new URLSearchParams({
        key: apiKey,
        q: locationQuery
    })
    try {
        const response = await fetch(`${baseUrl}${endpoint}?${params}`);
        if (!response.ok) {
            alert("No results found");
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function showWeather(weather){
    let city = document.getElementById("city");
    let distAndCountry = document.getElementById("distCountry");
    let time = document.getElementById("time");
    let currentLocation = weather["location"];

    city.textContent = currentLocation["name"];
    distAndCountry.textContent = "(" +  currentLocation["region"] + ", " + currentLocation["country"] + ")";
    time.textContent = "Local time: " + currentLocation["localtime"];

    let temp = document.getElementById("temperature");
    let cond = document.getElementById("conditions");
    let press = document.getElementById("pressure");
    let humidity = document.getElementById("humidity");
    let precip = document.getElementById("precipitation");
    let wind = document.getElementById("wind");
    let currentWeather = weather["current"];

    temp.textContent = currentWeather["temp_c"] + "°C / Feels like " + currentWeather["feelslike_c"] + "°C";
    press.textContent = currentWeather["pressure_in"] + " in";
    cond.textContent = currentWeather["condition"]["text"];
    document.getElementById("conditionIcon").setAttribute('src', currentWeather["condition"]["icon"] )
    humidity.textContent = currentWeather["humidity"] + "%";
    precip.textContent = currentWeather["precip_in"] + " in";
    wind.textContent = currentWeather["wind_dir"] + " @ " + currentWeather["wind_degree"] + "°, " + currentWeather["wind_kph"] + " kph";
    
    const isDay = currentWeather["is_day"];
    if(isDay){
        document.body.style.animation = 'toDay 3s forwards';
    }else{
        document.body.style.animation = 'toNight 3s forwards';
    }

}

document.addEventListener("DOMContentLoaded", async () => {

    try{
        const defaultCity = await getWeather("Vancouver");
        showWeather(defaultCity);
        console.log(defaultCity);
    }catch(error){
        console.log(error);
    }

    document.getElementById("search").addEventListener("input", async (event)=>{
        try{
            const autoCompletedResults = await searchLocation(event.target.value);
        }catch(error){
            console.log(error);
        }
    });
    document.querySelector("#form").addEventListener("submit", async (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const formDataObject = {};
        for (const [key, value] of formData) {
            formDataObject[key] = value;
        }
        const query = formDataObject["inputSearch"];
        let weather;
        try{
            weather = await getWeather(query);
            console.log(weather);
        }catch(error){
            console.log(error);
        }
        showWeather(weather);
    })
})